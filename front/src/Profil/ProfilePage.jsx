import React from 'react';
import { useTable, usePagination, useFilters, useSortBy } from 'react-table';
import useFetchTickets from '../kuke/useFetchTickets';

const colors = {
  primary: '#35524a',
  secondary: '#627c85',
  tertiary: '#779cab',
  accent: '#a2e8dd',
  highlight: '#32de8a'
};

const ProfilePage = () => {
  const { tickets, loading, error } = useFetchTickets();

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Događaj',
        accessor: 'event.name'
      },
      {
        Header: 'Sedište',
        accessor: 'seat'
      },
      {
        Header: 'Cena',
        accessor: 'price'
      },
      {
        Header: 'Tip karte',
        accessor: 'ticket_type.name'
      }
    ],
    []
  );

  const data = React.useMemo(() => tickets, [tickets]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    useFilters,
    useSortBy,
    usePagination
  );

  if (loading) return <p style={{ color: colors.primary }}>Učitavanje...</p>;
  if (error) return <p style={{ color: colors.primary }}>Došlo je do greške: {error.message}</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: colors.accent, minHeight: '100vh', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: colors.primary }}>Moj Profil</h1>
        <p style={{ color: colors.secondary }}>Pregled svih vaših karata.</p>
      </header>

      <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: colors.secondary, color: 'white' }}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ padding: '10px', border: `1px solid ${colors.primary}` }}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ backgroundColor: 'white', color: colors.primary }}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={{ padding: '10px', border: `1px solid ${colors.primary}` }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Stranica{' '}
          <strong>
            {pageIndex + 1} od {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Idi na stranicu:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Prikaži {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProfilePage;
