const {mockRequest, mockResponse} = require('jest-mock-req-res');

const controller = require('./controller');
const service = require('./service');

jest.mock('./service');

describe("User controller", () => {
    const mockData = [
        {
            "id": 1,
            "first_name": "Kalie",
            "last_name": "Gasparro",
            "email": "kgasparro0@prnewswire.com",
            "password": "Atl++0CXeYwScsBg3HNWrEBdGLqWUuLtgVYrZ4En0wiF4c07Mib4S2WOfggYccVL",
            "role": 1
        },
        {
            "id": 2,
            "first_name": "Alair",
            "last_name": "Hessenthaler",
            "email": "ahessenthaler1@soup.io",
            "password": "lCRgaYoJ2sxzcMqIyyfPZRvI+4qS2QKrX1j8ioSgKLblciuUTu9HrdH1m4OwnT0j",
            "role": 1
        },
        {
            "id": 3,
            "first_name": "Zarla",
            "last_name": "Pittwood",
            "email": "zpittwood2@google.com.au",
            "password": "3OFYAZfFlEqxLDpDquZRGORpMk8pFw/zGv3AF7OaVqz1Vd898lBgLe+HcJQQm8Ep",
            "role": 3
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
