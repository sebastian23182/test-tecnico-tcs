import Swal from 'sweetalert2'
import TableFromComponent from 'react-bootstrap/Table'
import DataTables from 'datatables.net-bs5'
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs
import 'datatables.net-buttons-bs5'
import 'datatables.net-buttons/js/buttons.colVis.mjs'
import 'datatables.net-buttons/js/buttons.html5.mjs'
import 'datatables.net-buttons/js/buttons.print.mjs'
import 'datatables.net-responsive-bs5'
import 'datatables.net-scroller-bs5'
import 'datatables.net-select-bs5'
import { type Product } from '../types/product'
import { columns } from '../services/table'
import { useRef, useEffect, type Dispatch, type SetStateAction } from 'react'

interface Props {
    readonly products: Product[]
    readonly setProducts: Dispatch<SetStateAction<Product[]>>
}

function Table({ products, setProducts }: Props) {
    const tableRef = useRef<HTMLTableElement>(null)

    useEffect(() => {
        const DataTable = new DataTables (tableRef.current!, {
            columns,
            data: products,
            paging: true,
            pagingType: 'full_numbers',
            pageLength: 4,
            dom: 'lfBrtip',
            order: [[1, 'asc']],
            language: {
                lengthMenu: 'Show _MENU_'    
            },
            responsive: true,
            autoWidth: false,
            searching: true,
            ordering: true,
            select: {
                style: 'multi',
                selector: 'td:first-child input[type="checkbox"]',
            },
            columnDefs: [
                { orderable: false, targets: 0 },
                { width: '20%', targets: 2 },
                { width: '80%', targets: 4 },
                { orderable: false, targets: 8 },
            ],
            buttons: [
                'print',
                'copy',
                'pdf',
                {
                    text: 'Delete',
                    action: (_, datatable) => {
                        const selectedRows = datatable.rows({ selected: true }).data().toArray()
                        if (selectedRows.length) {
                            Swal.fire({
                                title: '¿Estás seguro?',
                                text: `Se eliminaran ${selectedRows.length} filas, esto no se puede revertir!`,
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Si, borrar!'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: 'Borrado!',
                                        text: `${selectedRows.length} filas eliminadas!`,
                                        icon: 'success'
                                    })
                                    const idsToRemove = selectedRows.map((row) => row.id)
                                    setProducts((prevState) => prevState.filter((product) => !idsToRemove.includes(product.id)))
                                    datatable.rows({ selected: true }).remove().draw()
                                }
                            })
                        }        
                    }
                },
                {
                    text: 'Sum',
                    action: () => { 
                        const sum = products.reduce((total, product) => total + product.price, 0)
                        Swal.fire({
                        title: 'Listo!',
                        text: `La suma de los productos de la tabla es de ${sum}, en total hay ${products.length} productos`,
                        icon: 'success'
                        })
                    }
                },
                {
                    extend: 'colvis',
                    columns: ':not(:first-child)'
                }
            ],          
        })

        DataTable.off('click').on('click', '.btn-outline-primary', (event: Event) => {
            const data = DataTable.row((event.currentTarget as HTMLElement)?.parentNode?.parentNode as HTMLTableRowElement).data()

            Swal.fire({
                title: data.title,
                text: data.description,
                imageUrl: data.image,
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: 'Product image'
            })
        })

        return () => {
            DataTable.destroy()
        }
    }, [products, setProducts])

    return <TableFromComponent ref={tableRef} className='table table-striped' width='100%'/>
}

export { Table }