const {mockRequest, mockResponse} = require('jest-mock-req-res');

const controller = require('./controller');
const service = require('./service');

jest.mock('./service');

describe("Partner controller", () => {
    const mockData = [
        {
            "id": 1,
            "country_code": "AT",
            "state": "Steiermark",
            "postcode": "8644",
            "city": "Sankt Lorenzen im Mürztal",
            "street": "Browning Plaza",
            "house_number": "37921"
        },
        {
            "id": 2,
            "country_code": "AT",
            "state": "Niederösterreich",
            "postcode": "3923",
            "city": "Zwettl",
            "street": "Vera Point",
            "house_number": "983"
        },

    ];

    let response;
    const nextFunction = jest.fn();

    beforeEach(() => {
        service.__setMockData(mockData);
        response = mockResponse();
    });

    test("find one with valid id", () => {
        const ENTITY_ID = 1;

        const request = mockRequest({
            params: {
                id: ENTITY_ID
            }
        });

        return controller.findOne(request, response, nextFunction)
            .then(() => {
                expect(service.findOne).toBeCalledWith(ENTITY_ID);
                expect(response.json).toBeCalledWith(
                    mockData.find(entity => entity.id === ENTITY_ID)
                );
            })
    });
});
