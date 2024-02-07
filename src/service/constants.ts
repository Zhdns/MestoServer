import { constants } from "buffer";


export const enum CUSTOM_ERRORS {
    VALIDATION_ERROR = 'ValidationError',
    CAST_ERROR = 'CastError',
    SERVER_ERROR = 'Server error ;(',
    NO_USER_ERROR = 'User is not exist',
    NO_USER_OR_CARD_ERROR = 'User or Card is not exist',
    NO_PAGE = 'Page is not found'
}

export const enum USER_ID {
    user_HarryPotter = '65c0e90e3fcee7b7c0ee5928',
    user_LordVoldemort = '65c0e93e3fcee7b7c0ee592a',
    fakeUserId = '65b91c233a2ec53032de1600', 
}

export const enum CUSTOM_VALIDATION_TEXT {
    LESS_THEN_MIN = 'Name must be at least 2 characters',
    MORE_THEN_MAX = "Name must be less than 30 characters",
}