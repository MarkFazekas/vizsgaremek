const {mockRequest, mockResponse} = require('jest-mock-req-res');

const controller = require('./controller');
const service = require('./service');

jest.mock('./service');

describe("Vehicle controller", () => {
    const mockData = [
        {
            "id": 1,
            "plate_number": "LGG-873",
            "manufacturer": "Mercedes-Benz",
            "model": "G-Class",
            "production_year": 2009
        },
        {
            "id": 2,
            "plate_number": "XKV-065",
            "manufacturer": "Chrysler",
            "model": "Sebring",
            "production_year": 1996
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
