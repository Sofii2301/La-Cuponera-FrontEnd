import React from 'react';
import Pagos from './Pagos';

export default function HistorialPedidos() {
    return (
        <>
            <Pagos>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-12">
                        <div class="card custom-card"> 
                            <div class="card-header  border-bottom-0 pb-0"> 
                                <div>
                                    <div class="d-flex">
                                        <label class="main-content-label my-auto pt-2">All Orders</label> 
                                    </div>
                                </div>
                            </div> 
                            <div class="card-body pt-2">
                                <div class="row table-filter align-items-center">
                                    <div class="col-xl-3 col-lg-12"> 
                                        <div class="d-flex align-items-center filter-group"> 
                                            <span>Show</span>
                                            <div class="d-flex ms-2 mx-2">
                                                <div>
                                                    <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true" aria-expanded="false">
                                                        <div class="choices__inner">
                                                            <select name="quantity" id="select-countries17" class="form-control wd-150 choices__input" tabindex="-1" data-choice="active">
                                                                <option value="1">1</option>
                                                            </select>
                                                        </div>
                                                    </div> 
                                                </div> 
                                            </div> 
                                        </div> 
                                    </div> 
                                    <div class="col-xl-9 col-lg-12 d-lg-flex justify-content-end align-items-center mb-3 mt-2 mt-xl-0">
                                        <div class="d-flex mt-3 mt-lg-0">
                                            <div class="filter-group d-inline-flex w-100">
                                            <input type="text" class="form-control rounded-end-0" placeholder="search"/>
                                            <button type="button" class="btn btn-primary">
                                                <i class="fa fa-search"></i>
                                            </button> 
                                        </div> 
                                    </div> 
                                    <div class="d-sm-flex mt-3 mt-lg-0 ms-3">
                                        <div class="filter-group d-flex align-items-center mb-2 mb-sm-0">
                                            <label class="mt-2 me-2">Location</label>
                                            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true" aria-expanded="false">
                                                <div class="choices__inner">
                                                    <select class="form-control choices__input" data-trigger="" hidden="" tabindex="-1" data-choice="active">
                                                        <option value="All" data-custom-properties="[object Object]">All</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="filter-group ms-3 d-flex align-items-center">
                                            <label class="mt-2 me-2">Status</label> 
                                            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true" aria-expanded="false">
                                                <div class="choices__inner">
                                                    <select class="form-control choices__input" data-trigger="" hidden="" tabindex="-1" data-choice="active">
                                                        <option value="Any" data-custom-properties="[object Object]">Any</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div> 
                            </div> 
                            <div class="table-responsive border border-bottom-0"> 
                                <table class="table mb-0 text-nowrap text-md-nowrap"> 
                                    <thead>
                                        <tr class="border-bottom">
                                            <th>ID</th>
                                            <th>Invoice</th>
                                            <th>Name</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Warehouse</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-bottom">
                                            <th scope="row">#W83549801</th>
                                            <td>2</td><td>Anna Sthesia</td>
                                            <td>08/11/2020</td><td>$1000</td>
                                            <td>Boston</td><td><span class="status bg-warning">
                                                </span> Pending</td><td> 
                                                <div class="button-list"> 
                                                    <a class="btn">
                                                        <i class="bi bi-file-earmark-text"></i>
                                                    </a> 
                                                    <a class="btn">
                                                        <i class="bi bi-pencil-square"></i>
                                                    </a> 
                                                    <a class="btn">
                                                        <i class="bi bi-trash"></i>
                                                    </a> 
                                                </div> 
                                            </td>
                                        </tr>
                                        <tr class="border-bottom">
                                            <th scope="row">#W83549802</th>
                                            <td>5</td>
                                            <td>Barb Dwyer</td>
                                            <td>15/11/2020</td>
                                            <td>$4577</td>
                                            <td>Washington DC</td>
                                            <td>
                                                <span class="status bg-success"></span> Delivered
                                            </td>
                                            <td> 
                                                <div class="button-list">
                                                    <a class="btn">
                                                        <i class="bi bi-file-earmark-text"></i>
                                                    </a> 
                                                    <a class="btn">
                                                        <i class="bi bi-pencil-square"></i>
                                                    </a> 
                                                    <a class="btn">
                                                        <i class="bi bi-trash"></i>
                                                    </a> 
                                                </div> 
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> 
                            </div>
                            <nav aria-label="..." class="mt-3"> 
                                <ul class="pagination justify-content-end"> 
                                    <li class="page-item disabled"> 
                                        <span class="page-link">Previous</span> 
                                    </li> 
                                    <li class="page-item">
                                        <a class="page-link">1</a>
                                    </li> 
                                    <li class="page-item active" aria-current="page"> 
                                        <span class="page-link">2</span> 
                                    </li> 
                                    <li class="page-item">
                                        <a class="page-link">Next</a>
                                    </li> 
                                </ul> 
                            </nav> 
                        </div> 
                    </div>
                    </div>
                </div>
            </div>
            </Pagos>
        </>
    );
}
