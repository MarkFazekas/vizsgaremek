const {mockRequest, mockResponse} = require('jest-mock-req-res');

const controller = require('./controller');
const service = require('./service');

jest.mock('./service');

describe("Destination controller", () => {
    const mockData = [
        {
            "id": 1,
            "date": "2022.01.12 12:45:87",
            "vehicle": "62b942781af4ca1f19c638f4",
            "from_partner": "62b942781af4ca1f19c636a4",
            "to_partner": "62b942781af4ca1f19c636a5",
            "trip_type": "62b942781af4ca1f19c63868",
            "distance": 12.45
        },
        {
            "id": 2,
            "date": "2021.01.12 12:45:87",
            "vehicle": "62b942781af4ca1f19c638f5",
            "from_partner": "62b942781af4ca1f19c636a6",
            "to_partner": "62b942781af4ca1f19c636a7",
            "trip_type": "62b942781af4ca1f19c63869",
            "distance": 16.98
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
