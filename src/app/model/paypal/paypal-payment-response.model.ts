export interface PaypalPaymentResponse{
    environment: string,
    paypal_sdk_version: string,
    platform: string,
    product_name: string,
    response: response
}

interface response {
    create_time: Date,
    id: string,
    intent: string,
    state: string
}