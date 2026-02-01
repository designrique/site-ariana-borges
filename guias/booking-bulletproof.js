try {
    return {
        json: {
            message: "Se você vê isso, o Webhook + JS funcionaram!",
            timestamp: new Date().toISOString()
        }
    };
} catch (error) {
    return {
        json: {
            error: error.message
        }
    };
}
