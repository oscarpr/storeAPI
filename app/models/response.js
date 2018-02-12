class Response {

    constructor(success) {
        this.succcess = success;
    }
}

class SuccessResponse extends Response {

    constructor(total_elements) {
        super(true);

        this.total_elements = total_elements;
    }
}

class ErrorResponse extends Response {

    constructor(error_code, error_msg) {
        super(false)
        this.succcess = false;

        this.error_code = error_code;
        this.error_msg = error_msg;
    }
}



module.exports = { succcess: SuccessResponse, error: ErrorResponse };