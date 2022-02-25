import * as React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type ConfirmDialogProps = {
	open: boolean;
	options: ConfirmOptions;
	onCancel: React.MouseEventHandler<HTMLButtonElement>;
	onConfirm: React.MouseEventHandler<HTMLButtonElement>;
	onReject?: React.MouseEventHandler<HTMLButtonElement>;
	onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
};

const ConfirmationDialog = ({
	open,
	options,
	onCancel,
	onConfirm,
	onClose,
	onReject,
}: ConfirmDialogProps) => {
	const {
		title,
		description,
		content,
		confirmationText,
		cancellationText,
		dialogProps,
		rejectionText,
		confirmationButtonProps,
		cancellationButtonProps,
	} = options;

	return (
		<Dialog {...dialogProps} open={open} onClose={onClose}>
			{title && <DialogTitle>{title}</DialogTitle>}
			{content ? (
				<DialogContent>{content}</DialogContent>
			) : (
				description && (
					<DialogContent>
						<DialogContentText color="HighlightText">
							{description}
						</DialogContentText>
					</DialogContent>
				)
			)}
			<DialogActions
				sx={{
					display: "flex",
					flexDirection: onReject ? "column" : "row",
					alignItems: "end",
					padding: (theme) => theme.spacing(2, 3),
				}}
			>
				<Button
					sx={{
						justifyContent: onReject ? "end" : "center",
						minWidth: "auto",
					}}
					{...confirmationButtonProps}
					onClick={onConfirm}
				>
					{confirmationText}
				</Button>
				{onReject && (
					<Button
						sx={{
							justifyContent: "end",
							minWidth: "auto",
						}}
						{...confirmationButtonProps}
						onClick={onReject}
					>
						{rejectionText}
					</Button>
				)}

				<Button
					sx={{
						color: (theme) => theme.palette.text.primary,
						justifyContent: onReject ? "end" : "center",
						minWidth: "auto",
					}}
					{...cancellationButtonProps}
					onClick={onCancel}
				>
					{cancellationText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export interface ConfirmOptions {
	title?: React.ReactNode;
	description?: React.ReactNode;
	content?: React.ReactNode | null;
	confirmationText?: React.ReactNode;
	cancellationText?: React.ReactNode;
	rejectionText?: React.ReactNode;
	showRejection?: boolean;
	dialogProps?: Omit<DialogProps, "open">;
	confirmationButtonProps?: ButtonProps;
	cancellationButtonProps?: ButtonProps;
}

export interface ConfirmProviderProps {
	defaultOptions?: ConfirmOptions;
}

const ConfirmContext = React.createContext<
	(options?: ConfirmOptions) => Promise<UserChoice>
>(async () => "refuse");

const DEFAULT_OPTIONS = {
	title: "Are you sure?",
	description: "",
	content: null,
	confirmationText: "Ok",
	rejectionText: "No",
	showRejection: false,
	cancellationText: "Cancel",
	dialogProps: {},
	confirmationButtonProps: {},
	cancellationButtonProps: {},
};

const buildOptions = (
	defaultOptions: ConfirmOptions,
	options: ConfirmOptions
) => {
	const dialogProps = {
		...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
		...(options.dialogProps || {}),
	};
	const confirmationButtonProps = {
		...(defaultOptions.confirmationButtonProps ||
			DEFAULT_OPTIONS.confirmationButtonProps),
		...(options.confirmationButtonProps || {}),
	};
	const cancellationButtonProps = {
		...(defaultOptions.cancellationButtonProps ||
			DEFAULT_OPTIONS.cancellationButtonProps),
		...(options.cancellationButtonProps || {}),
	};

	return {
		...DEFAULT_OPTIONS,
		...defaultOptions,
		...options,
		dialogProps,
		confirmationButtonProps,
		cancellationButtonProps,
	};
};

export type UserChoice = "accept" | "refuse" | "cancel";

export const ConfirmProvider = ({
	children,
	defaultOptions = {},
}: {
	children?: React.ReactChild | React.ReactChild[];
	defaultOptions?: ConfirmOptions;
}) => {
	const [options, setOptions] = React.useState({
		...DEFAULT_OPTIONS,
		...defaultOptions,
	});
	const [resolveReject, setResolveReject] = React.useState<
		((value: UserChoice | PromiseLike<UserChoice>) => void)[]
	>([]);
	const [resolve, reject] = resolveReject;

	const confirm = React.useCallback<
		(options?: ConfirmOptions) => Promise<UserChoice>
	>(
		(options = {}) => {
			return new Promise((resolve, reject) => {
				setOptions(buildOptions(defaultOptions, options));
				setResolveReject([resolve, reject]);
			});
		},
		[defaultOptions]
	);

	const handleClose = React.useCallback(() => {
		setResolveReject([]);
	}, []);

	const handleCancel = React.useCallback(() => {
		reject("cancel");
		handleClose();
	}, [reject, handleClose]);

	const handleConfirm = React.useCallback(() => {
		resolve("accept");
		handleClose();
	}, [resolve, handleClose]);

	const handleRefuse = React.useCallback(() => {
		resolve("refuse");
		handleClose();
	}, [resolve, handleClose]);

	return (
		<React.Fragment>
			<ConfirmContext.Provider value={confirm}>
				{children}
			</ConfirmContext.Provider>
			<ConfirmationDialog
				open={resolveReject.length === 2}
				options={options}
				onClose={handleClose}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
				onReject={options.showRejection ? handleRefuse : undefined}
			/>
		</React.Fragment>
	);
};

export const useConfirm: () => (
	options?: ConfirmOptions
) => Promise<UserChoice> = () => {
	const confirm = React.useContext(ConfirmContext);
	return confirm;
};
