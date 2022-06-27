const {mockRequest, mockResponse} = require('jest-mock-req-res');

const controller = require('./controller');
const service = require('./service');

jest.mock('./service');

describe("TripReason controller", () => {
    const mockData = [
        {
            "id": 1,
            "trip_reason": "Assistant",
            "trip_type": "BUSINESS"
        },
        {
            "id": 2,
            "trip_reason": "Banking",
            "trip_type": "BUSINESS"
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
