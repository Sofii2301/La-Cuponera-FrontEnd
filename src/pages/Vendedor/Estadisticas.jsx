import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // Import necessary for chart.js v3

export default function Estadisticas() {
    const [followers, setFollowers] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [salesData, setSalesData] = useState([]);
    const [ordersData, setOrdersData] = useState([]);
    const [activityData, setActivityData] = useState([]);

    /*useEffect(() => {
        // Simulating API calls
        const fetchData = async () => {
            const response = await fetch('https://api.example.com/dashboard-data');
            const data = await response.json();
        
            setFollowers(data.followers.length);
            setTotalSales(data.totalSales);
            setTotalProfit(data.totalProfit);
            setTotalOrders(data.orders.length);
        
            setSalesData(data.salesData); // Assuming sales data for the Line chart
            setOrdersData(data.ordersData); // Assuming order status data for the Doughnut chart
            setActivityData(data.activity); // Assuming activity data for the activity table
        };
    
        fetchData();
    }, []);*/

    useEffect(() => {
        // Simulated data fetching
        const fetchData = () => {
            const data = {
                followers: new Array(3672).fill('follower'),
                totalSales: 89265,
                totalProfit: 23987,
                orders: new Array(46486).fill('order'),
                salesData: [
                    { date: '2024-05-01', amount: 200 },
                    { date: '2024-05-02', amount: 400 },
                    { date: '2024-05-03', amount: 300 },
                    { date: '2024-05-04', amount: 500 },
                    { date: '2024-05-05', amount: 700 },
                    { date: '2024-05-06', amount: 600 },
                    { date: '2024-05-07', amount: 800 },
                ],
                ordersData: [30000, 10000, 5000, 2000, 1500, 1000], // Completes, Pendientes, Procesando, Canceladas, Reembolsadas, En espera
                activity: [
                    { icon: 'btc', title: 'Venta', status: 'Completada', color: '#0088ff', description: 'Venta de producto A', amount: 50, date: '2024-05-07', name: 'Persona' },
                    { icon: 'ltc', title: 'Reembolso', status: 'Reembolsada', color: '#e3a41d', description: 'Reembolso de producto B', amount: -30, date: '2024-05-06', name: 'Persona' },
                    { icon: 'dash', title: 'Venta', status: 'Pendiente', color: '#e31d93', description: 'Venta de producto C', amount: 80, date: '2024-05-05', name: 'Persona' },
                    { icon: 'xrp', title: 'Pago Plan', status: 'Completado', color: '#0088ff', description: 'Pago mensual del plan', amount: -20, date: '2024-05-04', name: 'Persona' },
                    { icon: 'bsd', title: 'Venta', status: 'Cancelada', color: '#e31d1d', description: 'Venta de producto D', amount: 100, date: '2024-05-03', name: 'Persona' },
                ]
            };

            setFollowers(data.followers.length);
            setTotalSales(data.totalSales);
            setTotalProfit(data.totalProfit);
            setTotalOrders(data.orders.length);
        
            setSalesData(data.salesData);
            setOrdersData(data.ordersData);
            setActivityData(data.activity);
        };
    
        fetchData();
    }, []);
    
    const lineChartData = {
        labels: salesData.map(sale => sale.date), // Assuming salesData is an array of objects with date and amount
        datasets: [
            {
                label: 'Ventas en el mes',
                data: salesData.map(sale => sale.amount),
                fill: false,
                backgroundColor: '#f9ec00',
                borderColor: '#0088ff'
            }
        ]
    };
    
    const doughnutChartData = {
        labels: ['Completadas', 'Pendientes', 'Procesando', 'Canceladas', 'Reembolsadas', 'En espera'],
        datasets: [
            {
                data: ordersData, // Assuming ordersData is an array with counts of each status
                backgroundColor: [
                    '#0088ff',
                    '#e31d93',
                    '#f9ec00',
                    '#e31d1d',
                    '#e3a41d',
                    '#1de3b1'
                ]
            }
        ]
    };

    

    return (
        <>
            <Vendedor>
            <div className="container-fluid mt-3">
                <div className="row row-sm">
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="card custom-card">
                        <div className="card-body">
                        <div className="card-order">
                            <label className="main-content-label mb-3 pt-1">Nuevos Seguidores</label>
                            <h2 className="text-end card-item-icon card-icon">
                                <i className="bi bi-people-fill icon-size float-start"></i>
                                <span className="fw-bold">{followers}</span>
                            </h2>
                            <p className="mb-0 mt-4 text-muted">
                                Seguidores mensuales
                                <span className="float-end">50%</span>
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="card custom-card">
                        <div className="card-body">
                        <div className="card-order">
                            <label className="main-content-label mb-3 pt-1">Total Ventas</label>
                            <h2 className="text-end">
                                <i className="bi bi-cart3 icon-size float-start"></i>
                                <span className="fw-bold">${totalSales}</span>
                            </h2>
                                <p className="mb-0 mt-4 text-muted">
                                Ventas mensuales
                                <span className="float-end">45</span>
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="card custom-card">
                        <div className="card-body">
                        <div className="card-order">
                            <label className="main-content-label mb-3 pt-1">Total Ganancia</label>
                            <h2 className="text-end">
                                <i className="bi bi-cash icon-size mdi mdi-poll-box float-start text-primary"></i>
                                <span className="fw-bold">${totalProfit}</span>
                            </h2>
                            <p className="mb-0 mt-4 text-muted">
                                Ganancia mensual
                                <span className="float-end">$4,678</span>
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="card custom-card">
                        <div className="card-body">
                        <div className="card-order">
                            <label className="main-content-label mb-3 pt-1">Total Pedidos</label>
                            <h2 className="text-end">
                                <i className="bi bi-box2-heart icon-size float-start text-primary"></i>
                                <span className="fw-bold">{totalOrders}</span>
                            </h2>
                            <p className="mb-0 mt-4 text-muted">
                                Pedidos mensuales
                                <span className="float-end">3,756</span>
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 grafico">
                    <div className="card custom-card">
                        <div className="card-header">
                            <div className="card-title est"><i class="bi bi-graph-up"></i>Ventas</div>
                        </div>
                        <div className="card-body">
                        <div className="chart-container line-est">
                            <Line data={lineChartData} />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 grafico">
                    <div className="card custom-card">
                        <div className="card-header">
                            <div className="card-title est"><i class="bi bi-pie-chart"></i>Ventas</div>
                        </div>
                        <div className="card-body">
                        <div className="chart-container doughnut-est">
                            <Doughnut data={doughnutChartData} />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div className="card custom-card overflow-hidden">
                        <div className="card-header border-bottom-0 pb-0">
                            <div>
                                <div className="card-title est"><i className="bi bi-activity"></i> Actividad</div>
                                <span className="d-block fs-12 mb-0 mt-1 text-muted">
                                
                                </span>
                            </div>
                        </div>
                        <div className="card-body pt-2">
                            {/*<div className="row table-filter align-items-center">
                                <div className="col-xl-3 col-lg-12">
                                <div className="d-flex align-items-center filter-group">
                                    <span>Show</span>
                                    <div className="d-flex ms-2 mx-2">
                                    <div>
                                        <select name="quantity" id="select-quantity" className="form-control wd-150">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                        </select>
                                    </div>
                                    </div>
                                    <span>entries</span>
                                </div>
                                </div>
                                <div className="col-xl-9 col-lg-12 d-lg-flex justify-content-end align-items-center mb-3 mt-2 mt-xl-0">
                                <div className="d-flex mt-3 mt-lg-0">
                                    <div className="filter-group d-inline-flex w-100">
                                        <input type="text" className="form-control rounded-end-0" placeholder="search" />
                                        <button type="button" className="btn btn-primary"><i className="fa fa-search"></i></button>
                                    </div>
                                </div>
                                </div>
                            </div>*/}
                            <div className="table-responsive border border-bottom-0">
                                <table className="table mb-0 text-nowrap text-md-nowrap row-activity">
                                    <thead>
                                    <tr className="border-bottom">
                                        <th>Icono</th>
                                        <th>Nombre</th>
                                        <th>Título</th>
                                        <th>Descripcion</th>
                                        <th>Estado</th>
                                        <th>Fecha</th>
                                        <th>Monto</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {activityData.map((activity, index) => (
                                        <tr key={index} className="border-bottom">
                                            {/* <th scope="row">{index + 1}</th> */}
                                            <td>
                                                <div className={`activity-icon bg-primary-transparent text-primary`}>
                                                    <i className={`cf cf-${activity.icon} wd-20 ht-20 text-center fs-18`}></i>
                                                </div>
                                            </td>
                                            <td>{activity.name}</td>
                                            <td>{activity.title}</td>
                                            <td>{activity.description}</td>
                                            <td style={{color: activity.color}}>{activity.status}</td>
                                            <td>{activity.date}</td>
                                            <td className={ activity.amount >= 0 ? 'text-success' : 'text-danger' }>
                                                {activity.amount} {activity.amount >= 0 ? <i className="bi bi-arrow-up-right text-success"></i> : <i className="bi bi-arrow-down-right ms-1 text-danger"></i>}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="..." className="mt-3">
                            <ul className="pagination justify-content-end">
                                <li className="page-item disabled">
                                <span className="page-link">Previous</span>
                                </li>
                                <li className="page-item"><a className="page-link">1</a></li>
                                <li className="page-item active" aria-current="page">
                                <span className="page-link">2</span>
                                </li>
                                <li className="page-item">
                                <a className="page-link">Next</a>
                                </li>
                            </ul>
                            </nav>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </Vendedor>
        </>
    );
}


{/* {activity.status==="Completada" && (setColorStatus('#0088ff'))}
                                            {activity.status==="Completado" && (setColorStatus('#0088ff'))}
                                            {activity.status==="Pendiente" && (setColorStatus('#e31d93'))}
                                            {activity.status==="Procesando" && (setColorStatus('#f9ec00'))}
                                            {activity.status==="Cancelada" && (setColorStatus('#e31d1d'))}
                                            {activity.status==="Reembolsada" && (setColorStatus('#e3a41d'))}
                                            {activity.status==="En espera" && (setColorStatus('#1de3b1'))} */}

/*
{
    "followers": ["follower1", "follower2"],
    "totalSales": 89265,
    "totalProfit": 23987,
    "orders": ["order1", "order2"],
    "salesData": [
        { "date": "2024-05-01", "amount": 200 },
        { "date": "2024-05-02", "amount": 400 }
    ],
    "ordersData": [40, 20, 10, 10, 15, 5], // Completes, Pendientes, Procesando, Canceladas, Reembolsadas, En espera
    "activity": [
        { "icon": "btc", name: 'Persona', "description": "Venta de producto A", "status": "Venta", "amount": 50 },
        { "icon": "ltc", name: 'Persona', "description": "Reembolso de producto B", "status": "Reembolso", "amount": -30 }
    ]
}
*/