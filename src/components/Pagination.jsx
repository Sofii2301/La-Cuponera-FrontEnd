import { useState, useEffect } from 'react';
import ListaCupones from './Cupones/ListaCupones';
import ListaVendedores from './Vendedor/ListaVendedores';

// eslint-disable-next-line react/prop-types
const Pagination = ({ items = [], itemsPerPage, itemType }) => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1); // Reset page to 1 when items change
    }, [items]);

    // Calcula el número total de páginas
    // eslint-disable-next-line react/prop-types
    const totalPages = Math.ceil((items?.length || 0) / itemsPerPage);

    // Obtiene los elementos de la página actual
    // eslint-disable-next-line react/prop-types
    const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Función para cambiar la página
    const changePage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Renderiza los botones de paginación
    const renderPaginationButtons = () => {
        const buttons = [];
        const pageRange = 2; // Número de botones antes y después de la página actual

        let startPage = Math.max(1, currentPage - pageRange);
        let endPage = Math.min(totalPages, currentPage + pageRange);

        if (startPage > 1) {
            buttons.push(
                <button
                    key={1}
                    onClick={() => changePage(1)}
                    className={`px-3 py-1 mx-1 border rounded ${1 === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                buttons.push(<span key="start-ellipsis" className="px-3 py-1 mx-1">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => changePage(i)}
                    className={`px-3 py-1 mx-1 border rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(<span key="end-ellipsis" className="px-3 py-1 mx-1">...</span>);
            }
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => changePage(totalPages)}
                    className={`px-3 py-1 mx-1 border rounded ${totalPages === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                >
                    {totalPages}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div>
            {/* Renderiza los elementos de la página actual */}
            {itemType === 'cupon' && (
                <ListaCupones listaCupones={currentItems}/>
            )}
            {itemType === 'vendedor' && (
                <ListaVendedores listaVendedores={currentItems}/>
            )}
            {/* Renderiza los botones de paginación */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 mx-1 border rounded bg-white text-blue-500"
                >
                    &lt;
                </button>
                {renderPaginationButtons()}
                <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 mx-1 border rounded bg-white text-blue-500"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Pagination;
