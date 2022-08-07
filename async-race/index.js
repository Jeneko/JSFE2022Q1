(()=>{"use strict";var __webpack_modules__={585:()=>{eval("\n;// CONCATENATED MODULE: ./src/types/index.ts\nvar types_Endpoints;\r\n(function (Endpoints) {\r\n    Endpoints[\"garage\"] = \"garage\";\r\n    Endpoints[\"winners\"] = \"winners\";\r\n    Endpoints[\"engine\"] = \"engine\";\r\n})(types_Endpoints || (types_Endpoints = {}));\r\nvar ResponseStatus;\r\n(function (ResponseStatus) {\r\n    ResponseStatus[ResponseStatus[\"ok\"] = 200] = \"ok\";\r\n    ResponseStatus[ResponseStatus[\"created\"] = 201] = \"created\";\r\n    ResponseStatus[ResponseStatus[\"badRequest\"] = 400] = \"badRequest\";\r\n    ResponseStatus[ResponseStatus[\"notFound\"] = 404] = \"notFound\";\r\n    ResponseStatus[ResponseStatus[\"tooManyRequests\"] = 429] = \"tooManyRequests\";\r\n    ResponseStatus[ResponseStatus[\"internalServerError\"] = 500] = \"internalServerError\";\r\n})(ResponseStatus || (ResponseStatus = {}));\r\nvar PageName;\r\n(function (PageName) {\r\n    PageName[\"garage\"] = \"garage\";\r\n    PageName[\"winners\"] = \"winners\";\r\n})(PageName || (PageName = {}));\r\nvar Sort;\r\n(function (Sort) {\r\n    Sort[\"id\"] = \"id\";\r\n    Sort[\"wins\"] = \"wins\";\r\n    Sort[\"time\"] = \"time\";\r\n})(Sort || (Sort = {}));\r\nvar Order;\r\n(function (Order) {\r\n    Order[\"asc\"] = \"ASC\";\r\n    Order[\"desc\"] = \"DESC\";\r\n})(Order || (Order = {}));\r\nvar EngineStatus;\r\n(function (EngineStatus) {\r\n    EngineStatus[\"started\"] = \"started\";\r\n    EngineStatus[\"stopped\"] = \"stopped\";\r\n})(EngineStatus || (EngineStatus = {}));\r\n\n;// CONCATENATED MODULE: ./src/utils/state.ts\n\r\nconst SALT = '_jen_k23hiahsf3';\r\nconst STATE_NAME = `state${SALT}`;\r\nconst DEFAULT_STATE = {\r\n    page: PageName.garage,\r\n    garagePagination: 1,\r\n    garageQtyOnPage: 7,\r\n    garageTotalCount: 0,\r\n    winnersPagination: 1,\r\n    winnersQtyOnPage: 10,\r\n    winnersTotalCount: 0,\r\n    winnersSort: Sort.wins,\r\n    winnersOrder: Order.desc,\r\n    currentWinner: -1,\r\n};\r\nfunction getState() {\r\n    const stateString = localStorage.getItem(STATE_NAME);\r\n    if (typeof stateString === 'string') {\r\n        const state = JSON.parse(stateString);\r\n        return state;\r\n    }\r\n    return DEFAULT_STATE;\r\n}\r\nfunction saveState(state) {\r\n    localStorage.setItem(STATE_NAME, JSON.stringify(state));\r\n}\r\nfunction updateState(key, value) {\r\n    const state = getState();\r\n    saveState({ ...state, [key]: value });\r\n}\r\nfunction setWinnerId(carId) {\r\n    localStorage.setItem('winnerId', String(carId));\r\n}\r\nfunction getWinnerId() {\r\n    return Number(localStorage.getItem('winnerId'));\r\n}\r\nfunction clearWinnerId() {\r\n    localStorage.removeItem('winnerId');\r\n}\r\n\n;// CONCATENATED MODULE: ./src/components/page-menu/page-menu.ts\n\r\n\r\n\r\nfunction getPageMenu() {\r\n    const currentPage = getState().page;\r\n    const pageMenu = document.createElement('div');\r\n    pageMenu.className = 'page-menu';\r\n    const pageMenuMapper = {\r\n        [PageName.garage]: `\n      <button class=\"btn-pages\" data-page=\"garage\" disabled>Garage</button>\n      <button class=\"btn-pages\" data-page=\"winners\">Winners</button>\n    `,\r\n        [PageName.winners]: `\n    <button class=\"btn-pages\" data-page=\"garage\">Garage</button>\n    <button class=\"btn-pages\" data-page=\"winners\" disabled>Winners</button>\n    `,\r\n    };\r\n    pageMenu.innerHTML = pageMenuMapper[currentPage];\r\n    pageMenu.onclick = (e) => {\r\n        const target = e.target;\r\n        if (target.dataset.page) {\r\n            updateState('page', target.dataset.page);\r\n            pageMenu.dispatchEvent(new Event('switchPage', { bubbles: true }));\r\n            pageMenu.replaceWith(getPageMenu());\r\n        }\r\n    };\r\n    return pageMenu;\r\n}\r\n\n;// CONCATENATED MODULE: ./src/components/car/car.ts\n\r\nfunction generateCar(color, id, name) {\r\n    return `\n    <div class=\"car\" data-color=\"${color}\" data-id=\"${id}\" data-name=\"${name}\">\n      <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n      viewBox=\"0 0 512 512\" style=\"fill: ${color};\"><path d=\"M461.913,190.073c-17.736,0-31.054,0-47.132,0l-34.965-98.021c-6.417-20.847-26.031-35.366-47.873-35.366H126.564\n      c-17.499,0-33.861,9.256-42.891,24.208L7.569,189.39C3.896,194.628,0.02,204.822,0,215.785v113.464\n      c0,27.618,22.469,50.087,50.087,50.087h6.417c7.887,43.155,45.738,75.979,91.136,75.979s83.249-32.824,91.136-75.979h28.94\n      c7.887,43.155,45.738,75.979,91.136,75.979c45.398,0,83.249-32.824,91.136-75.979h11.925c27.618,0,50.087-22.469,50.087-50.087\n      c0-10.956,0-79.179,0-89.088C512,212.542,489.531,190.073,461.913,190.073z M147.64,421.923\n      c-32.666,0-59.244-26.559-59.278-59.217c0-0.022,0.003-0.043,0.003-0.066c0-32.685,26.587-59.277,59.275-59.277\n      c32.71,0,59.275,26.662,59.275,59.277c0,0.022,0.003,0.043,0.003,0.066C206.884,395.363,180.305,421.923,147.64,421.923z\n      M70.156,223.463c-13.505,0-21.411-15.248-13.668-26.283l62.337-88.867c3.125-4.454,8.225-7.108,13.668-7.108h191.546\n      c7.058,0,13.353,4.438,15.725,11.086l31.704,88.867c3.877,10.868-4.198,22.305-15.725,22.305H70.156z M358.852,421.923\n      c-32.673,0-59.256-26.571-59.279-59.238c0-0.014,0.002-0.029,0.002-0.043c0-16.344,6.648-31.164,17.382-41.898\n      c10.734-10.732,25.552-17.379,41.894-17.379c32.687,0,59.28,26.593,59.28,59.28C418.132,395.33,391.539,421.923,358.852,421.923z\n      M478.609,247.94h-24.487v-24.476h7.791c9.206,0,16.696,7.49,16.696,16.696V247.94z\"/>\n      <path d=\"M147.64,334.817c-15.343,0-27.826,12.483-27.826,27.826s12.483,27.826,27.826,27.826\n      c15.343,0,27.826-12.483,27.826-27.826S162.983,334.817,147.64,334.817z\"/>\n      <path d=\"M358.852,334.817c-15.343,0-27.826,12.483-27.826,27.826s12.483,27.826,27.826,27.826\n      c15.343,0,27.826-12.483,27.826-27.826S374.195,334.817,358.852,334.817z\"/>\n      </svg>\n    </div>\n  `;\r\n}\r\n\n;// CONCATENATED MODULE: ./src/utils/race-functions.ts\n\r\n\r\n\r\nasync function startEngine(carId) {\r\n    const engineResponse = await controlEngine(carId, 'started');\r\n    return engineResponse;\r\n}\r\nasync function stopEngine(carId) {\r\n    const engineResponse = await controlEngine(carId, 'stopped');\r\n    return engineResponse;\r\n}\r\nfunction startAnimation(carId, engineResponse, animationIds) {\r\n    const car = document.querySelector(`.car[data-id=\"${carId}\"]`);\r\n    const duration = engineResponse.distance / engineResponse.velocity; // ms\r\n    const distance = document.querySelector('.track').clientWidth - car.clientWidth;\r\n    const speed = distance / duration; // px/ms\r\n    car.classList.add('car-racing');\r\n    const startTime = Date.now();\r\n    animationIds.set(carId, requestAnimationFrame(function animate() {\r\n        const diff = Date.now() - startTime;\r\n        let delta = diff * speed; // px\r\n        if (delta > distance) { // Prevent car from going beyond the end of the distance\r\n            delta = distance;\r\n            car.style.left = `${delta}px`;\r\n        }\r\n        car.style.left = `${delta}px`;\r\n        animationIds.set(carId, requestAnimationFrame(animate));\r\n    }));\r\n}\r\nfunction disableUIWhileRace(disabled, type) {\r\n    const elems = [];\r\n    elems.push(document.querySelector('.btn-create-car'));\r\n    elems.push(document.querySelector('.btn-generate-cars'));\r\n    elems.push(...document.querySelectorAll('.btn-select-car'));\r\n    elems.push(...document.querySelectorAll('.btn-remove-car'));\r\n    elems.push(...document.querySelectorAll('.garage-pagination .btn-pagination'));\r\n    if (type === 'single') {\r\n        elems.push(document.querySelector('.btn-race-all'));\r\n    }\r\n    if (type === 'all') {\r\n        elems.push(...document.querySelectorAll('.btn-car-start'));\r\n    }\r\n    if (disabled) {\r\n        elems.forEach((btn) => { btn.classList.add('ui-disabled-by-race'); });\r\n        return;\r\n    }\r\n    if (type === 'single') {\r\n        const activeCars = document.querySelectorAll('.car-racing');\r\n        if (activeCars.length)\r\n            return;\r\n    }\r\n    elems.forEach((btn) => { btn.classList.remove('ui-disabled-by-race'); });\r\n}\r\nfunction returnCar(carId) {\r\n    const car = document.querySelector(`.car[data-id=\"${carId}\"]`);\r\n    const startButton = document.querySelector(`.btn-car-start[data-id=\"${carId}\"]`);\r\n    const stopButton = document.querySelector(`.btn-car-stop[data-id=\"${carId}\"]`);\r\n    car.style.left = '0';\r\n    stopButton.disabled = true;\r\n    startButton.disabled = false;\r\n    car.classList.remove('car-racing');\r\n}\r\nfunction isFirst() {\r\n    return Boolean(!getWinnerId());\r\n}\r\nfunction processTheWinner(carId, time) {\r\n    setWinnerId(carId);\r\n    const winner = document.querySelector(`.car[data-id=\"${carId}\"]`);\r\n    winner.dispatchEvent(new CustomEvent('newWinner', {\r\n        bubbles: true,\r\n        detail: { ...winner.dataset, time },\r\n    }));\r\n}\r\nasync function startEngines(carsIds) {\r\n    const promiseArr = [];\r\n    carsIds.forEach((carId) => {\r\n        promiseArr.push(startEngine(carId));\r\n    });\r\n    return Promise.all(promiseArr);\r\n}\r\nasync function stopEnginesAndReturnCars(carsIds, animationIds) {\r\n    const promiseArr = [];\r\n    carsIds.forEach((carId) => {\r\n        const curPromise = stopEngine(carId);\r\n        curPromise.then(() => {\r\n            cancelAnimationFrame(animationIds.get(carId));\r\n            returnCar(carId);\r\n        });\r\n        promiseArr.push(curPromise);\r\n    });\r\n    return Promise.all(promiseArr);\r\n}\r\nasync function driveCars(carsIds, engineResponses, abortController, animationIds, announceWinner) {\r\n    carsIds.forEach((carId, idx) => {\r\n        const raceTime = ((engineResponses[idx].distance / engineResponses[idx].velocity) / 1000).toFixed(2);\r\n        startAnimation(carId, engineResponses[idx], animationIds);\r\n        switchEngineToDrive(carId, abortController.signal)\r\n            .then((result) => {\r\n            cancelAnimationFrame(animationIds.get(carId));\r\n            if (result.status === ResponseStatus.ok && isFirst() && announceWinner) {\r\n                processTheWinner(carId, raceTime);\r\n            }\r\n        })\r\n            .catch(() => { });\r\n    });\r\n}\r\n\n;// CONCATENATED MODULE: ./src/components/cars-list-item/cars-list-item.ts\n\r\n\r\n\r\nasync function startCar(carId, abortController, animationIds) {\r\n    const btnCarStop = document.querySelector(`.btn-car-stop[data-id=\"${carId}\"]`);\r\n    const btnCarStart = document.querySelector(`.btn-car-start[data-id=\"${carId}\"]`);\r\n    disableUIWhileRace(true, 'single');\r\n    btnCarStart.disabled = true;\r\n    const engineResponse = await startEngines([carId]);\r\n    btnCarStop.disabled = false;\r\n    driveCars([carId], engineResponse, abortController, animationIds, false);\r\n}\r\nasync function stopAndReturnCar(carId, abortController, animationIds) {\r\n    const btnCarStop = document.querySelector(`.btn-car-stop[data-id=\"${carId}\"]`);\r\n    const btnCarStart = document.querySelector(`.btn-car-start[data-id=\"${carId}\"]`);\r\n    abortController.abort();\r\n    btnCarStop.disabled = true;\r\n    await stopEnginesAndReturnCars([carId], animationIds);\r\n    btnCarStart.disabled = false;\r\n    disableUIWhileRace(false, 'single');\r\n}\r\nfunction handleEvents(elem) {\r\n    let abortController;\r\n    const animationIds = new Map();\r\n    elem.onclick = async (e) => {\r\n        const target = e.target;\r\n        const carId = Number(target.dataset.id);\r\n        // Click on Start Car\r\n        if (target.classList.contains('btn-car-start')) {\r\n            abortController = new AbortController();\r\n            startCar(carId, abortController, animationIds);\r\n        }\r\n        // Click on Stop Car\r\n        if (target.classList.contains('btn-car-stop')) {\r\n            stopAndReturnCar(carId, abortController, animationIds);\r\n        }\r\n    };\r\n}\r\nfunction carsListItem(carInfo) {\r\n    const elem = document.createElement('li');\r\n    elem.className = 'cars-list-item';\r\n    elem.dataset.id = String(carInfo.id);\r\n    elem.innerHTML = `\n    <div class=\"car-edit\">\n      <button class=\"btn-select-car\" data-id=\"${carInfo.id}\">Select</button>\n      <button class=\"btn-remove-car\" data-id=\"${carInfo.id}\">Remove</button>\n      <div class=\"car-name\">${carInfo.name}</div>\n    </div>\n    <div class=\"track-container\">\n      <div class=\"car-control\">\n        <button class=\"btn-car-start\" data-id=\"${carInfo.id}\">A</button>\n        <button class=\"btn-car-stop\" data-id=\"${carInfo.id}\" disabled>B</button>\n      </div>\n      <div class=\"track\">${generateCar(carInfo.color, carInfo.id, carInfo.name)}</div>\n      <div class=\"finish-flag\">\n        <svg width=\"30\" height=\"30\" viewBox=\"0 0 150 160\" fill=\"${carInfo.color}\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M22 67.5H97.7333V21.0787H22L39 44.2893L22 67.5Z\"/>\n          <path d=\"M97.7333 11V21.0787M97.7333 149H118M97.7333 149H77.4667M97.7333 149V67.5M97.7333 67.5H22L39 44.2893L22 21.0787H97.7333M97.7333 67.5V21.0787\" stroke=\"${carInfo.color}\" stroke-width=\"16\" stroke-linecap=\"round\"/>\n        </svg>\n      </div>\n    </div>\n  `;\r\n    handleEvents(elem);\r\n    return elem;\r\n}\r\n\n;// CONCATENATED MODULE: ./src/components/cars-list/cars-list.ts\n\r\n\r\n\r\nfunction cars_list_handleEvents(elem) {\r\n    elem.onclick = async (e) => {\r\n        e.preventDefault();\r\n        const target = e.target;\r\n        const carId = Number(target.dataset.id);\r\n        // Click on Remove Btn\r\n        if (target.classList.contains('btn-remove-car')) {\r\n            await deleteCar(carId);\r\n            elem.dispatchEvent(new Event('updateCarsList', { bubbles: true }));\r\n        }\r\n        // Click on Select Btn\r\n        if (target.classList.contains('btn-select-car')) {\r\n            const allRemoveButtons = document.querySelectorAll('.btn-remove-car');\r\n            allRemoveButtons.forEach((btn) => { btn.disabled = false; });\r\n            const curRemoveButton = document.querySelector(`.btn-remove-car[data-id=\"${carId}\"]`);\r\n            curRemoveButton.disabled = true;\r\n            const car = await getCar(carId);\r\n            elem.dispatchEvent(new CustomEvent('fillUpdateCarForm', { bubbles: true, detail: car }));\r\n        }\r\n    };\r\n}\r\nfunction getCarsList(carsList) {\r\n    const elem = document.createElement('ol');\r\n    elem.className = 'cars-list';\r\n    carsList.forEach((car) => { elem.append(carsListItem(car)); });\r\n    cars_list_handleEvents(elem);\r\n    return elem;\r\n}\r\nfunction carsArrayToCarsObject(array) {\r\n    return Object.fromEntries(array.map((el) => [el.id, el]));\r\n}\r\n\n;// CONCATENATED MODULE: ./src/API/api.ts\n\r\n\r\n\r\nconst SOURCE = 'http://localhost:3000';\r\n// ======================\r\n//        GARAGE\r\n// ======================\r\nasync function getCars(_page, _limit) {\r\n    const { garagePagination, garageQtyOnPage } = getState();\r\n    _page = _page || garagePagination;\r\n    _limit = _limit || garageQtyOnPage;\r\n    const url = `${SOURCE}/${types_Endpoints.garage}?_page=${_page}&_limit=${_limit}`;\r\n    const response = await fetch(url);\r\n    const result = await response.json();\r\n    return {\r\n        carsList: result,\r\n        totalCount: Number(response.headers.get('X-Total-Count')),\r\n    };\r\n}\r\nasync function getAllCars() {\r\n    const url = `${SOURCE}/${types_Endpoints.garage}`;\r\n    const response = await fetch(url);\r\n    const result = await response.json();\r\n    return result;\r\n}\r\nasync function getCar(id) {\r\n    const url = `${SOURCE}/${types_Endpoints.garage}/${id}`;\r\n    const response = await fetch(url);\r\n    const result = await response.json();\r\n    return result;\r\n}\r\nasync function getCarFullInfo(id) {\r\n    const url = `${SOURCE}/${Endpoints.garage}/${id}`;\r\n    const response = await fetch(url);\r\n    const car = await response.json();\r\n    const winners = await getAllWinnersCars();\r\n    const winner = winners.find((el) => el.id === id);\r\n    if (winner) {\r\n        return Object.assign(car, winner);\r\n    }\r\n    return car;\r\n}\r\nasync function createCar(name, color) {\r\n    const url = `${SOURCE}/${types_Endpoints.garage}`;\r\n    const options = {\r\n        method: 'POST',\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n        },\r\n        body: JSON.stringify({\r\n            name,\r\n            color,\r\n        }),\r\n    };\r\n    const response = await fetch(url, options);\r\n    const result = await response.json();\r\n    return result;\r\n}\r\nasync function deleteCar(id) {\r\n    const url = `${SOURCE}/${types_Endpoints.garage}/${id}`;\r\n    const options = { method: 'DELETE' };\r\n    const result = await fetch(url, options);\r\n    if (result.status === ResponseStatus.ok) {\r\n        const winners = await getAllWinnersCars();\r\n        if (winners.find((el) => el.id === id)) {\r\n            await deleteWinner(id);\r\n        }\r\n    }\r\n    return result.status;\r\n}\r\nasync function updateCar(id, name, color) {\r\n    const url = `${SOURCE}/${types_Endpoints.garage}/${id}`;\r\n    const options = {\r\n        method: 'PUT',\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n        },\r\n        body: JSON.stringify({\r\n            name,\r\n            color,\r\n        }),\r\n    };\r\n    const result = await fetch(url, options);\r\n    return result.status;\r\n}\r\n// TODO: write enum for status\r\nasync function controlEngine(id, status) {\r\n    const url = `${SOURCE}/${types_Endpoints.engine}?id=${id}&status=${status}`;\r\n    const options = { method: 'PATCH' };\r\n    const response = await fetch(url, options);\r\n    const result = await response.json();\r\n    return result;\r\n}\r\nasync function switchEngineToDrive(id, signal) {\r\n    const url = `${SOURCE}/${types_Endpoints.engine}?id=${id}&status=drive`;\r\n    const options = {\r\n        method: 'PATCH',\r\n        signal,\r\n    };\r\n    return fetch(url, options);\r\n}\r\n// ======================\r\n//       WINNERS\r\n// ======================\r\nasync function getWinnersTotalCount() {\r\n    const url = `${SOURCE}/${Endpoints.winners}`;\r\n    const response = await fetch(url);\r\n    return Number(response.headers.get('X-Total-Count'));\r\n}\r\nasync function getWinnersCars(_page, _limit, _sort, _order) {\r\n    const { winnersPagination, winnersQtyOnPage, winnersSort, winnersOrder, } = getState();\r\n    _page = _page || winnersPagination;\r\n    _limit = _limit || winnersQtyOnPage;\r\n    _sort = _sort || winnersSort;\r\n    _order = _order || winnersOrder;\r\n    const url = `${SOURCE}/${types_Endpoints.winners}?_page=${_page}&_limit=${_limit}&_sort=${_sort}&_order=${_order}`;\r\n    const response = await fetch(url);\r\n    const winners = await response.json();\r\n    // Supplement winners with cars info\r\n    const carsList = await getAllCars();\r\n    const carsById = carsArrayToCarsObject(carsList);\r\n    const winnersFullInfo = winners.map((el) => Object.assign(el, carsById[el.id]));\r\n    return {\r\n        winnersCarsList: winnersFullInfo,\r\n        totalCount: Number(response.headers.get('X-Total-Count')),\r\n    };\r\n}\r\nasync function getAllWinnersCars() {\r\n    const url = `${SOURCE}/${types_Endpoints.winners}/`;\r\n    const response = await fetch(url);\r\n    const winners = await response.json();\r\n    return winners;\r\n}\r\nasync function getWinner(id) {\r\n    const url = `${SOURCE}/${Endpoints.winners}/${id}`;\r\n    const response = await fetch(url);\r\n    const result = await response.json();\r\n    return result;\r\n}\r\nasync function createWinner(id, wins, time) {\r\n    const url = `${SOURCE}/${types_Endpoints.winners}`;\r\n    const options = {\r\n        method: 'POST',\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n        },\r\n        body: JSON.stringify({\r\n            id,\r\n            wins,\r\n            time,\r\n        }),\r\n    };\r\n    const response = await fetch(url, options);\r\n    return response;\r\n}\r\nasync function writeWinner(id, time) {\r\n    const winners = await getAllWinnersCars();\r\n    const curWinner = winners.find((el) => Number(el.id) === Number(id));\r\n    if (curWinner) {\r\n        const bestTime = curWinner.time > time ? time : curWinner.time;\r\n        await updateWinner(id, curWinner.wins + 1, bestTime);\r\n        return;\r\n    }\r\n    await createWinner(id, 1, time);\r\n}\r\nasync function deleteWinner(id) {\r\n    const url = `${SOURCE}/${types_Endpoints.winners}/${id}`;\r\n    const options = {\r\n        method: 'DELETE',\r\n    };\r\n    const response = await fetch(url, options);\r\n    return response.status;\r\n}\r\nasync function updateWinner(id, wins, time) {\r\n    const url = `${SOURCE}/${types_Endpoints.winners}/${id}`;\r\n    const options = {\r\n        method: 'PUT',\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n        },\r\n        body: JSON.stringify({\r\n            wins,\r\n            time,\r\n        }),\r\n    };\r\n    const response = await fetch(url, options);\r\n    return response;\r\n}\r\n\n;// CONCATENATED MODULE: ./src/components/create-car-form/create-car-form.ts\n\r\n\r\nfunction getCreateCarForm() {\r\n    const form = document.createElement('form');\r\n    form.className = 'create-car-form';\r\n    form.name = 'create-car-form';\r\n    form.innerHTML = `\n    <input type=\"text\" name=\"name\">\n    <input type=\"color\" name=\"color\" value=\"#ffffff\">\n    <button class=\"btn-create-car\">Create</button>\n  `;\r\n    form.onsubmit = async (e) => {\r\n        e.preventDefault();\r\n        const btn = form.querySelector('.btn-create-car');\r\n        const name = form.querySelector('[name=\"name\"]');\r\n        const color = form.querySelector('[name=\"color\"]');\r\n        btn.disabled = true;\r\n        await createCar(name.value, color.value);\r\n        name.value = '';\r\n        color.value = '#ffffff';\r\n        btn.disabled = false;\r\n        form.dispatchEvent(new Event('updateCarsList', { bubbles: true }));\r\n    };\r\n    return form;\r\n}\r\n\n;// CONCATENATED MODULE: ./src/components/update-car-form/update-car-form.ts\n\r\n\r\nfunction getUpdateCarForm(car) {\r\n    const form = document.createElement('form');\r\n    form.className = 'update-car-form';\r\n    form.name = 'update-car-form';\r\n    if (car) {\r\n        form.innerHTML = `\n      <input type=\"text\" name=\"name\" value=\"${car.name}\">\n      <input type=\"color\" name=\"color\" value=\"${car.color}\">\n      <input type=\"hidden\" name=\"id\" value=\"${car.id}\">\n      <button class=\"btn-update-car\">Update</button>\n    `;\r\n    }\r\n    else {\r\n        form.innerHTML = `\n      <input type=\"text\" name=\"name\" value=\"\">\n      <input type=\"color\" name=\"color\" value=\"#ffffff\">\n      <button class=\"btn-update-car\" disabled>Update</button>\n    `;\r\n    }\r\n    form.onsubmit = async (e) => {\r\n        e.preventDefault();\r\n        const id = form.querySelector('[name=\"id\"]');\r\n        const btn = form.querySelector('.btn-update-car');\r\n        const name = form.querySelector('[name=\"name\"]');\r\n        const color = form.querySelector('[name=\"color\"]');\r\n        btn.disabled = true;\r\n        await updateCar(Number(id.value), name.value, color.value);\r\n        name.value = '';\r\n        color.value = '#ffffff';\r\n        form.dispatchEvent(new Event('updateCarsList', { bubbles: true }));\r\n    };\r\n    return form;\r\n}\r\n\n;// CONCATENATED MODULE: ./src/components/race-controls/race-controls.ts\n\r\n\r\n\r\n\r\nconst GENERATE_CARS_QTY = 100;\r\nasync function startAllCars(carsIds, abortController, animationIds) {\r\n    const raceBtn = document.querySelector('.btn-race-all');\r\n    const resetBtn = document.querySelector('.btn-reset-all');\r\n    disableUIWhileRace(true, 'all');\r\n    raceBtn.disabled = true;\r\n    const engineResponses = await startEngines(carsIds);\r\n    resetBtn.disabled = false;\r\n    clearWinnerId(); // Clear up the last winner if any\r\n    await driveCars(carsIds, engineResponses, abortController, animationIds, true);\r\n}\r\nasync function stopAndReturnCars(carsIds, abortController, animationIds) {\r\n    const raceBtn = document.querySelector('.btn-race-all');\r\n    const resetBtn = document.querySelector('.btn-reset-all');\r\n    abortController.abort();\r\n    resetBtn.disabled = true;\r\n    await stopEnginesAndReturnCars(carsIds, animationIds);\r\n    raceBtn.disabled = false;\r\n    disableUIWhileRace(false, 'all');\r\n}\r\nfunction race_controls_handleEvents(elem) {\r\n    let abortController;\r\n    const animationIds = new Map();\r\n    elem.onclick = async (e) => {\r\n        e.preventDefault();\r\n        const target = e.target;\r\n        // Click on Generate Cars\r\n        if (target.classList.contains('btn-generate-cars')) {\r\n            await createCars(elem);\r\n        }\r\n        // Click on Race\r\n        if (target.classList.contains('btn-race-all')) {\r\n            abortController = new AbortController();\r\n            const carsIds = getCarsIdsFromCurrentPage();\r\n            startAllCars(carsIds, abortController, animationIds);\r\n        }\r\n        // Click on Reset\r\n        if (target.classList.contains('btn-reset-all')) {\r\n            const carsIds = getCarsIdsFromCurrentPage();\r\n            stopAndReturnCars(carsIds, abortController, animationIds);\r\n        }\r\n    };\r\n}\r\nfunction getRaceControls() {\r\n    const elem = document.createElement('div');\r\n    elem.className = 'race-controls';\r\n    elem.innerHTML = `\n    <button class=\"btn-race-all\">Race</button>\n    <button class=\"btn-reset-all\" disabled>Reset</button>\n    <button class=\"btn-generate-cars\">Generate Cars</button>\n  `;\r\n    race_controls_handleEvents(elem);\r\n    return elem;\r\n}\r\nfunction getCarsIdsFromCurrentPage() {\r\n    const carsIds = [];\r\n    const curCars = document.querySelectorAll('.cars-list-item');\r\n    curCars.forEach((el) => carsIds.push(Number(el.dataset.id)));\r\n    return carsIds;\r\n}\r\nasync function createCars(elem) {\r\n    const promiseArr = [];\r\n    for (let i = 0; i < GENERATE_CARS_QTY; i += 1) {\r\n        const car = race_controls_generateCar();\r\n        promiseArr.push(createCar(car.name, car.color));\r\n    }\r\n    await Promise.all(promiseArr);\r\n    elem.dispatchEvent(new Event('updateCarsList', { bubbles: true }));\r\n}\r\nfunction race_controls_generateCar() {\r\n    const car = {\r\n        name: generateName(),\r\n        color: generateColor(),\r\n    };\r\n    return car;\r\n}\r\nfunction generateName() {\r\n    const brands = ['Mercedess', 'BMW', 'Opel', 'Volkswagen', 'Audi', 'Volvo', 'Ford', 'Toyota', 'Suzuki', 'Mazda', 'Lexus', 'Nissan', 'Saab', 'Fiat', 'Mitsubishi', 'Renault', 'Peugeot'];\r\n    const models = ['z350', 'Astra', '4matic', 'Focus', 'Mustang', 'Corsa', 'Golf', 'rx7', 'Swift', 'ES 350', 'Q7', 'Arcana', 'Polo', 'Prius'];\r\n    return `${getRandomFromArray(brands)} ${getRandomFromArray(models)}`;\r\n}\r\nfunction generateColor() {\r\n    const min = 0;\r\n    const max = 255;\r\n    let red = (min + Math.floor(Math.random() * max + 1)).toString(16);\r\n    let green = (min + Math.floor(Math.random() * max + 1)).toString(16);\r\n    let blue = (min + Math.floor(Math.random() * max + 1)).toString(16);\r\n    red = red.length < 2 ? `0${red}` : red;\r\n    green = green.length < 2 ? `0${green}` : green;\r\n    blue = blue.length < 2 ? `0${blue}` : blue;\r\n    return `#${red}${green}${blue}`;\r\n}\r\nfunction getRandomFromArray(array) {\r\n    const min = 0;\r\n    const max = array.length;\r\n    const random = min + Math.floor(Math.random() * max);\r\n    return array[random];\r\n}\r\n\n;// CONCATENATED MODULE: ./src/components/pagination/pagination.ts\n\r\n\r\nfunction pagination_handleEvents(elem) {\r\n    elem.onclick = (e) => {\r\n        const curState = getState();\r\n        const curPage = curState.page;\r\n        const target = e.target;\r\n        // Pagination Prev\r\n        if (target.classList.contains('btn-pagination-prev')) {\r\n            updateState(`${curPage}Pagination`, curState[`${curPage}Pagination`] -= 1);\r\n            elem.dispatchEvent(new Event(`${curPage}UpdatePagination`, { bubbles: true }));\r\n        }\r\n        // Pagination Next\r\n        if (target.classList.contains('btn-pagination-next')) {\r\n            updateState(`${curPage}Pagination`, curState[`${curPage}Pagination`] += 1);\r\n            elem.dispatchEvent(new Event(`${curPage}UpdatePagination`, { bubbles: true }));\r\n        }\r\n    };\r\n}\r\nfunction getPagination(total, pageName) {\r\n    const curState = getState();\r\n    const elem = document.createElement('div');\r\n    elem.className = `pagination ${pageName}-pagination`;\r\n    const curPage = curState[`${pageName}Pagination`];\r\n    const curQtyOnPage = curState[`${pageName}QtyOnPage`];\r\n    elem.append(PaginationButton('Prev', 'btn-pagination-prev', curPage <= 1));\r\n    elem.append(PaginationButton('Next', 'btn-pagination-next', curPage >= total / curQtyOnPage));\r\n    pagination_handleEvents(elem);\r\n    return elem;\r\n}\r\nfunction PaginationButton(text, className, disabled) {\r\n    const paginationButton = document.createElement('button');\r\n    paginationButton.innerText = text;\r\n    paginationButton.className = `btn-pagination ${className}`;\r\n    paginationButton.disabled = disabled;\r\n    return paginationButton;\r\n}\r\n\n;// CONCATENATED MODULE: ./src/components/winner-message/winner-message.ts\n\r\n\r\nfunction getWinnerMessage(id, name, color, time) {\r\n    const winner = document.createElement('div');\r\n    winner.className = 'winner';\r\n    winner.innerHTML = `\n    ${generateCar(color, id, name)}\n    <div class=\"winner-info\" style=\"background-color: ${color};\">\n      ${name} is the winner!\n    </div>\n    <div class=\"winner-time\">\n      Time: [${time}s]\n    </div>\n  `;\r\n    const btnClose = document.createElement('button');\r\n    btnClose.className = 'btn-remove-winner';\r\n    btnClose.innerText = 'Ok';\r\n    btnClose.onclick = () => winner.remove();\r\n    winner.append(btnClose);\r\n    return winner;\r\n}\r\n\n;// CONCATENATED MODULE: ./src/components/garage-view/garage-view.ts\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nasync function updateGarageView() {\r\n    const curState = getState();\r\n    const cars = await getCars();\r\n    // Update Total Count\r\n    const totalCountSpan = document.querySelector('.garage-total-count');\r\n    totalCountSpan.innerText = `(${cars.totalCount})`;\r\n    // Update Current Page Number\r\n    const curPageNumber = document.querySelector('.garage-current-page-number');\r\n    curPageNumber.innerText = `Page: #${curState.garagePagination}`;\r\n    // Update Car List\r\n    const carsListElem = document.querySelector('.cars-list');\r\n    carsListElem.replaceWith(getCarsList(cars.carsList));\r\n    // Update Pagination\r\n    const paginationElem = document.querySelector('.garage-pagination');\r\n    paginationElem.replaceWith(getPagination(cars.totalCount, PageName.garage));\r\n}\r\nfunction fillUpdateCarForm(e) {\r\n    const car = e.detail;\r\n    const updateCarForm = getUpdateCarForm(car);\r\n    const updateCarFormElem = document.querySelector('.update-car-form');\r\n    updateCarFormElem.replaceWith(updateCarForm);\r\n}\r\nasync function showWinnersInfo(e) {\r\n    const customEvent = e;\r\n    const winner = customEvent.detail;\r\n    const garageView = document.querySelector('.page-view-garage');\r\n    garageView.prepend(getWinnerMessage(winner.id, winner.name, winner.color, winner.time));\r\n}\r\nfunction garage_view_handleEvents() {\r\n    // Fill Update Car Form\r\n    document.addEventListener('fillUpdateCarForm', fillUpdateCarForm);\r\n    // Update Cars List\r\n    document.addEventListener('updateCarsList', updateGarageView);\r\n    // Update Pagination\r\n    document.addEventListener('garageUpdatePagination', updateGarageView);\r\n    // New winner\r\n    document.addEventListener('newWinner', showWinnersInfo);\r\n}\r\nasync function getGarageView() {\r\n    const curState = getState();\r\n    const cars = await getCars();\r\n    const elem = document.createElement('div');\r\n    elem.className = 'page-view page-view-garage';\r\n    elem.hidden = true;\r\n    elem.innerHTML = `\n    <h2>Garage <span class=\"garage-total-count\">(${cars.totalCount})</span></h2>\n    <div class=\"current-page-number garage-current-page-number\">Page: #${curState.garagePagination}</div>\n  `;\r\n    elem.append(getCreateCarForm());\r\n    elem.append(getUpdateCarForm());\r\n    elem.append(getRaceControls());\r\n    elem.append(getCarsList(cars.carsList));\r\n    elem.append(getPagination(cars.totalCount, PageName.garage));\r\n    garage_view_handleEvents();\r\n    return elem;\r\n}\r\n\n;// CONCATENATED MODULE: ./src/components/winners-table/winners-table.ts\n\r\n\r\n\r\n\r\n\r\nasync function sortWinnersTable(elem, sort) {\r\n    const curState = getState();\r\n    let sortOrder = Order.asc;\r\n    if (curState.winnersSort === sort) {\r\n        sortOrder = (curState.winnersOrder === Order.desc) ? Order.asc : Order.desc;\r\n    }\r\n    updateState('winnersSort', sort);\r\n    updateState('winnersOrder', sortOrder);\r\n    const winnersCars = await getWinnersCars();\r\n    elem.replaceWith(await getWinnersTable(winnersCars.winnersCarsList));\r\n}\r\nfunction winners_table_handleEvents(elem) {\r\n    elem.onclick = async (e) => {\r\n        const target = e.target;\r\n        // Sort By Wins\r\n        if (target.classList.contains('sort-by-wins')) {\r\n            sortWinnersTable(elem, Sort.wins);\r\n        }\r\n        // Sort By Wins\r\n        if (target.classList.contains('sort-by-time')) {\r\n            sortWinnersTable(elem, Sort.time);\r\n        }\r\n    };\r\n}\r\nfunction getWinnersTable(winnersCarsList) {\r\n    const curState = getState();\r\n    const elem = document.createElement('table');\r\n    elem.className = `winners-table order-${curState.winnersOrder.toLowerCase()}`;\r\n    const winsSort = curState.winnersSort === Sort.wins ? 'order-mark' : '';\r\n    const timeSort = curState.winnersSort === Sort.time ? 'order-mark' : '';\r\n    elem.innerHTML = `\n    <thead>\n      <tr>\n        <th class=\"column-pos\">Number</th>\n        <th class=\"column-view\">Car</th>\n        <th class=\"column-name\">Name</th>\n        <th class=\"sort-by-wins ${winsSort}\">Wins</th>\n        <th class=\"sort-by-time ${timeSort}\">Best time (s)</th>\n      </tr>\n    </thead>\n  `;\r\n    let tableBody = '';\r\n    winnersCarsList.forEach((winnerCar, idx) => {\r\n        const number = idx + 1 + curState.winnersQtyOnPage * (curState.winnersPagination - 1);\r\n        tableBody += `\n    <tr>\n      <td>${number}</td><td>${generateCar(winnerCar.color, winnerCar.id, winnerCar.name)}</td><td>${winnerCar.name}</td><td>${winnerCar.wins}</td><td>${winnerCar.time}</td>\n    </tr>\n    `;\r\n    });\r\n    elem.innerHTML += `<tbody>${tableBody}</tbody>`;\r\n    winners_table_handleEvents(elem);\r\n    return elem;\r\n}\r\n\n;// CONCATENATED MODULE: ./src/components/winners-view/winners-view.ts\n\r\n\r\n\r\n\r\n\r\nasync function updateWinnersView() {\r\n    const curState = getState();\r\n    const winnersCars = await getWinnersCars();\r\n    // Update Total Count\r\n    const totalCountSpan = document.querySelector('.winners-total-count');\r\n    totalCountSpan.innerText = `(${winnersCars.totalCount})`;\r\n    // Update Current Page Number\r\n    const curPageNumber = document.querySelector('.winners-current-page-number');\r\n    curPageNumber.innerText = `Page: #${curState.winnersPagination}`;\r\n    // Update Car List\r\n    const carsListElem = document.querySelector('.winners-table');\r\n    carsListElem.replaceWith(getWinnersTable(winnersCars.winnersCarsList));\r\n    // Update Pagination\r\n    const paginationElem = document.querySelector('.winners-pagination');\r\n    paginationElem.replaceWith(getPagination(winnersCars.totalCount, PageName.winners));\r\n}\r\nfunction winners_view_handleEvents() {\r\n    // Update Cars\r\n    document.addEventListener('updateCarsList', updateWinnersView);\r\n    // Update Pagination\r\n    document.addEventListener('winnersUpdatePagination', updateWinnersView);\r\n    // New winner\r\n}\r\nasync function getWinnersView() {\r\n    const curState = getState();\r\n    const winnersCars = await getWinnersCars();\r\n    const elem = document.createElement('div');\r\n    elem.className = 'page-view page-view-winners';\r\n    elem.hidden = true;\r\n    elem.innerHTML = `\n    <h2>Winners <span class=\"winners-total-count\">(${winnersCars.totalCount})</span></h2>\n    <div class=\"current-page-number winners-current-page-number\">Page: #${curState.winnersPagination}</div>\n  `;\r\n    elem.append(getWinnersTable(winnersCars.winnersCarsList));\r\n    elem.append(getPagination(winnersCars.totalCount, PageName.winners));\r\n    winners_view_handleEvents();\r\n    return elem;\r\n}\r\n\n;// CONCATENATED MODULE: ./src/components/app/app.ts\n\r\n\r\n\r\n\r\n\r\nfunction switchPage() {\r\n    const pages = document.querySelectorAll('.page-view');\r\n    pages.forEach((page) => { page.hidden = true; });\r\n    const curPage = document.querySelector(`.page-view-${getState().page}`);\r\n    curPage.hidden = false;\r\n}\r\nasync function app_processTheWinner(e) {\r\n    const customEvent = e;\r\n    const winner = customEvent.detail;\r\n    await writeWinner(Number(winner.id), Number(winner.time));\r\n    const winnersView = document.querySelector('.page-view-winners');\r\n    winnersView.replaceWith(await getWinnersView());\r\n    switchPage();\r\n}\r\nfunction app_handleEvents() {\r\n    // Switch page\r\n    document.addEventListener('switchPage', switchPage);\r\n    // New Winner\r\n    document.addEventListener('newWinner', app_processTheWinner);\r\n}\r\nasync function startApp() {\r\n    document.body.append(getPageMenu());\r\n    document.body.append(await getGarageView());\r\n    document.body.append(await getWinnersView());\r\n    switchPage();\r\n    app_handleEvents();\r\n}\r\n\n;// CONCATENATED MODULE: ./src/index.ts\n\r\n\r\nstartApp();\r\n\n\n//# sourceURL=webpack://async-race/./src/index.ts_+_17_modules?")}},__webpack_exports__={};__webpack_modules__[585]()})();