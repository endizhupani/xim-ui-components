import {
	TableFooter,
	TableSortLabel,
	TableContainer,
	TableBody,
	Paper,
	Table,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";

import React, { useEffect, useMemo, useState } from "react";

type SearchFunc<T> = (row: T, searchString?: string) => boolean;
type SortFunc<T> = (a: T, b: T) => number;
type BaseColumn<T> = {
	id: string;
	name: string | JSX.Element;
	orderable?: boolean;
	searchable?: boolean;
	align?: "left" | "right";
	sort?: SortFunc<T>;
	search?: SearchFunc<T>;
};

type ComponentColumnOrdering<T> =
	| {
			orderable?: false;
			sort?: SortFunc<T>;
	  }
	| {
			orderable: true;
			sort: SortFunc<T>;
	  };
type ComponentColumnSearching<T> =
	| {
			searchable?: false;
			search?: SearchFunc<T>;
	  }
	| {
			searchable: true;
			search: SearchFunc<T>;
	  };

type ComponentColumn<T> = {
	data: (row: T) => React.ReactElement;
} & ComponentColumnOrdering<T> &
	ComponentColumnSearching<T>;

type StringColumn<T> = {
	data: (row: T) => string;
};

// type OnlyKeysForStringProps<Base> = Pick<
// 	Base,
// 	{
// 		[Key in keyof Base]: Base[Key] extends string ? Key : never;
// 	}[keyof Base]
// >;
type KeysMatching<T, V> = {
	[K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];
// export type OnlyKeysForStringProps<Base> = {
// 	[Key in keyof Base as Base[Key] extends string ? Key : never]: Base[Key];
// };

export type KeyColumn<T> = {
	data: KeysMatching<T, string>;
};

export type GenericColumn<T> = BaseColumn<T> &
	(ComponentColumn<T> | StringColumn<T> | KeyColumn<T>);

type GenericTableOrdering = {
	[colId: string]: { priority: number; direction: "asc" | "desc" };
};
export type GenericTableState = {
	currentPage: number;
	order: GenericTableOrdering;
};

type KeySelectorFunc<T> = (row: T) => string;

type SelectableTable =
	| {
			selectable?: false;
			selectedRows?: string[];
			selectionMode?: "single" | "multi";
			maxSelectedRows?: number;
			onSelectionChange?: (selectedRows: string[]) => void;
	  }
	| {
			selectable: true;
			selectionMode?: "single" | "multi";
			selectedRows: string[];
			maxSelectedRows?: number;
			onSelectionChange: (selectedRows: string[]) => void;
	  };

export type XimTableProperties<T> = {
	columns: GenericColumn<T>[];
	entriesPerPage?: number;
	rows: T[];
	id: string;
	emptyComponent?: JSX.Element;
	keySelector: KeySelectorFunc<T>;
	searchString?: string;
} & SelectableTable;

type ComputedRow<T> = {
	row: T;
	key: string;
	columnInfo: {
		computed?: string;
		search: (searchString?: string) => boolean;
		type: string;
		rendered: GenericColumn<T>["data"];
	}[];
};

export function XimTable<T>({
	columns,
	rows,
	keySelector,
	entriesPerPage,
	searchString,
	emptyComponent,
	selectable,
	onSelectionChange,
	selectedRows,
	selectionMode,
	id,
	maxSelectedRows,
}: XimTableProperties<T>) {
	const [currentPage, setCurrentPage] = useState(0);
	const [order, setOrder] = useState({} as GenericTableOrdering);
	const pageBounds = (
		pageNumber: number,
		rowCount: number
	): [number, number] => {
		const lowerBound = entriesPerPage ? pageNumber * entriesPerPage : 0;
		const upperBound = entriesPerPage
			? (pageNumber + 1) * entriesPerPage
			: rowCount;
		return [lowerBound, Math.min(upperBound, rowCount)];
	};

	const sortByOrderObject = (targetRows: ComputedRow<T>[]) => {
		let sortedRows = targetRows;
		Object.entries(order)
			.sort((a, b) => b[1].priority - a[1].priority)
			.forEach(([key, ordering]) => {
				sortedRows.sort((a, b) => {
					const columnIdx = columns.findIndex(
						(c) => c.orderable && c.id === key
					);
					const column = columns[columnIdx];
					if (column == null) return 0;
					if (columnIdx < 0) throw Error("col not found");
					if (typeof column.sort === "function")
						return ordering.direction === "asc"
							? column.sort(a.row, b.row)
							: column.sort(b.row, a.row);
					const valA = a.columnInfo[columnIdx].computed;
					const valB = b.columnInfo[columnIdx].computed;
					if (valA == null || valB == null) return 0;
					return (
						valA.localeCompare(valB) *
						(ordering.direction === "asc" ? 1 : -1)
					);
				});
			});
		return sortedRows;
	};
	const generateHeaderCells = () => {
		return columns.map((col, _, arr) => {
			return !col.orderable ? (
				<TableCell
					align={col.align ?? "left"}
					key={id + "_header_" + col.id}
				>
					<p>{col.name}</p>
				</TableCell>
			) : (
				<TableCell
					align={col.align ?? "left"}
					key={id + "_header_" + col.id}
					sortDirection={
						col.orderable && order[col.id] != null
							? order[col.id].direction
							: undefined
					}
				>
					{
						<TableSortLabel
							key={id + "_header_" + col.id + "_srt"}
							active={col.orderable && col.id in order}
							direction={
								col.orderable && order[col.id] != null
									? order[col.id].direction
									: undefined
							}
							onClick={(evt) => {
								if (!col.orderable) return;
								if (!evt.shiftKey)
									arr.forEach((c) => {
										if (c.id !== col.id) delete order[c.id];
									});
								const orderCopy = { ...order };
								if (col.id in orderCopy) {
									switch (orderCopy[col.id].direction) {
										case "asc":
											orderCopy[col.id].direction =
												"desc";
											// Use date.now as an indication of what was clicked first
											orderCopy[col.id].priority =
												Date.now();
											break;
										case "desc":
											delete orderCopy[col.id];
											break;
									}
								} else {
									orderCopy[col.id] = {
										direction: "asc",
										priority: Date.now(),
									};
								}
								setOrder(orderCopy);
							}}
						>
							{col.name}
						</TableSortLabel>
					}
				</TableCell>
			);
		});
	};
	const computedRows = useMemo(() => {
		return rows.map((r) => ({
			row: r,
			key: keySelector(r),
			columnInfo: columns.map((c, _) => {
				const computedValue =
					typeof c.data === "function"
						? c.data(r)
						: r[c.data.toString() as keyof T];
				return {
					computed:
						typeof computedValue === "string"
							? computedValue
							: undefined,
					rendered: computedValue,
					type: typeof computedValue,
					search: (searchString?: string) =>
						searchString == null
							? true
							: c.search != null
							? c.search(r, searchString)
							: c.searchable && typeof computedValue === "string"
							? computedValue
									.toLocaleLowerCase()
									.includes(
										searchString.toLocaleLowerCase()
									) ?? false
							: false,
				};
			}),
		}));
	}, [columns, keySelector, rows]);
	const tableRowsBeforePagination = sortByOrderObject(
		computedRows as ComputedRow<T>[]
	).filter((row) => {
		const isSearched =
			!searchString ||
			columns.some(
				(c, colIdx) =>
					c.searchable && row.columnInfo[colIdx].search(searchString)
			);
		return isSearched;
	});
	const tableRows = tableRowsBeforePagination
		.filter((_, idx, arr) => {
			const bounds = pageBounds(currentPage, arr.length);
			return idx >= bounds[0] && idx < bounds[1];
		})
		.map((row) => {
			return (
				<TableRow key={id + "_r_" + row.key}>
					{(() => {
						const cells = columns.map((col, colIdx) => {
							const selected = selectable
								? selectedRows!.findIndex((r) => r === row.key)
								: -1;
							return (
								<TableCell
									style={{
										backgroundColor:
											selected >= 0
												? "#ec6608"
												: undefined,
									}}
									key={id + "_r_" + row.key + "_c_" + col.id}
									align={col.align ?? "left"}
									onClick={() => {
										if (
											!selectable ||
											selectedRows == null ||
											onSelectionChange == null
										)
											return;
										if (selectionMode === "single") {
											onSelectionChange!(
												selected ? [row.key] : []
											);
											return;
										}
										let newSelected = [...selectedRows];
										if (selected >= 0) {
											newSelected.splice(selected, 1);
											onSelectionChange(newSelected);
										} else {
											newSelected.push(row.key);
											onSelectionChange(
												newSelected.slice(
													Math.max(
														newSelected.length -
															(maxSelectedRows ??
																newSelected.length),
														0
													)
												)
											);
										}
									}}
								>
									{(() => {
										return row.columnInfo[colIdx].rendered;
									})()}
								</TableCell>
							);
						});
						return cells;
					})()}
				</TableRow>
			);
		});

	// Refresh current page when search string changes
	useEffect(() => {
		if (tableRowsBeforePagination.length === rows.length) return;
		setCurrentPage(0);
	}, [searchString, tableRowsBeforePagination.length, rows.length]);
	return (
		<TableContainer
			sx={{
				backgroundColor: "transparent",
				"& thead": {
					"& .MuiTableSortLabel-active": {
						fontWeight: "bolder",
						color: "white",
						"& .MuiSvgIcon-root.MuiTableSortLabel-icon": {
							color: "white !important",
						},
					},
					"& .MuiTableSortLabel-root:hover": {
						fontWeight: "bolder",
						color: "#ec6608",
					},
				},
				"& thead p": {
					margin: "0",
				},
				"& tfoot td": {
					fontWeight: "bold",
					backgroundColor: "#1A1A1A",
				},
				"& th": {
					fontWeight: "bold",
					backgroundColor: "#1A1A1A",
				},
				"& tbody tr:nth-child(even) td": {
					backgroundColor: "#3b3b3b",
				},
				"& tbody tr:nth-child(odd) td": {
					backgroundColor: "#303030",
				},
				"& td, th": {
					borderColor: "transparent",
				},
			}}
			component={Paper}
			// className={style.root}
			elevation={0}
			style={{
				backgroundColor: "111318",
				height: "100%",
				width: "100%",
				maxHeight: "100%",
			}}
		>
			<Table stickyHeader={entriesPerPage == null}>
				<TableHead>
					<TableRow>{generateHeaderCells()}</TableRow>
				</TableHead>
				<TableBody>
					{tableRows.length ? (
						tableRows
					) : (
						<TableRow>
							<TableCell colSpan={columns.length}>
								{emptyComponent ?? (
									<p style={{ textAlign: "center" }}>
										No data found
									</p>
								)}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
				{entriesPerPage != null && rows.length > entriesPerPage ? (
					<TableFooter>
						<TableRow>
							<TablePagination
								count={
									!searchString
										? rows.length
										: tableRowsBeforePagination.length
								}
								rowsPerPage={entriesPerPage}
								rowsPerPageOptions={[]}
								page={currentPage}
								onPageChange={(_, pageNumber) => {
									setCurrentPage(pageNumber);
								}}
							/>
						</TableRow>
					</TableFooter>
				) : null}
			</Table>
		</TableContainer>
	);
}
