class ApiError extends Error{
    constructor(message,statusCode,error,path){
        super(message);
        this.message=message;
        this.statusCode=statusCode;
        this.error=error;
        this.path=path;
        this.success=false;
    }
}

export default ApiError;