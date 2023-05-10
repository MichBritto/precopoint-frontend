<template>
    <!--Button Supplier-->
    <button type="button" class="btn btn-danger shadow btn-sm" style="margin-left:2px" data-bs-toggle="modal" data-bs-target="#btnSupplier">Supplier</button>
    <!-- Modal - Fornecedor-->
    <div class="modal fade" id="btnSupplier" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <!--Button Close-->
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <!--Form Fornecedor-->
                                <div class="row justify-content-center">
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">   
                                        <!--Text-->           
                                        <P class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up at <span class="h2 text-danger fw-bold">Preço Point</span></P>
                                        <!--form-->
                                        <form class="mx-1 mx-md-4">
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" class="form-control"  />
                                                    <label class="form-label" for="form3Example1c" > Your Company Name</label>
                                                </div>
                                            </div>
                        
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example3c" class="form-control" />
                                                    <label class="form-label" for="form3Example2c">Address</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="tel" id="form3Example4c" class="form-control" />
                                                    <label class="form-label" for="form3Example3c">CPNJ</label>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>                                                                                                                                        
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="tel" id="form3Example5c" class="form-control" />
                                                    <label class="form-label" for="form3Example4c">Email</label>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>                                                                                                                                        
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="tel" id="form3Example5c" class="form-control" />
                                                    <label class="form-label" for="form3Example5c">Phone Number</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4c" class="form-control" />
                                                    <label class="form-label" for="form3Example6c">Password</label>
                                                </div>
                                            </div>
                        
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example7cd" class="form-control" />
                                                    <label class="form-label" for="form3Example4cd">Repeat your password</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="file" class="custom-file-input" id="inputGroupFile03">
                                                    <label class="custom-file-label" for="inputGroupFile03"></label>
                                                </div>
                                            </div>
                                            
                                            
                                            
                        
                                            <div class="form-check d-flex justify-content-center mb-5">
                                                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                <label class="form-check-label" for="form2Example3">
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div>
                        
                                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" class="btn btn-primary btn-lg shadow">Register</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src="@/assets/Queue-amico.svg" class="img-fluid" alt="Sample image">
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>   
            </div>
</template>

<script>  
    export default({
        name: "RegFornecedor"
    })
</script>

<style>
    
</style>