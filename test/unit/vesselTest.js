VesselTest = TestCase("VesselTest");

/**
 * Проверка работы конструктора
 * @returns {undefined}
 */
VesselTest.prototype.testCtor = function() {
    // GIVEN
    // WHEN
    var vessel = new Vessel('Yandex', [0, 0], 1000);
    // THEN
    assertEquals('Yandex', vessel.prototype.name);
    assertEquals([0, 0], vessel.prototype.position);
    assertEquals(1000, vessel.prototype.capacity);
    assertEquals(0, vessel.prototype.cargo);
};

/**
 * Проверка работы функции report сразу после конструктора
 * @returns {undefined}
 */
VesselTest.prototype.testReportAfterCtor = function() {
    // GIVEN
    var vessel = new Vessel('Yandex', [0, 0], 1000);
    // WHEN
    var report = vessel.report();
    // THEN
    assertEquals('Ship "Yandex". Placement: 0,0. Occupied: 0 from 1000t.', report);
};

/**
 * Проверка вычисления свободного места.
 * @returns {undefined}
 */
VesselTest.prototype.testGetFreeSpace = function() {
    // GIVEN
    var vessel = new Vessel('Yandex', [0, 0], 1000);
    // WHEN
    var freeSpace = vessel.getFreeSpace();
    // THEN
    assertEquals(1000, freeSpace);
};

/**
 * Проверка вычисления занятого места.
 * @returns {undefined}
 */
VesselTest.prototype.testGetOccupiedSpace = function() {
    // GIVEN
    var vessel = new Vessel('Yandex', [0, 0], 1000);
    // WHEN
    var freeSpace = vessel.getOccupiedSpace();
    // THEN
    assertEquals(0, freeSpace);
};

/**
 * Проверка загрузки слишком большого количества груза
 * @returns {undefined}
 */
VesselTest.prototype.testTooBigLoad = function() {
    // GIVEN
    var vessel = new Vessel('Yandex', [0, 0], 1000);
    // WHEN
    try {
        vessel.load(1500);
        fail('No expected exception');
    } catch (err) {
        // THEN
        assertEquals('the cargo weight is too big', err);
    }
};

/**
 * Проверка загрузки допустимого количества груза
 * @returns {undefined}
 */
VesselTest.prototype.testNormalLoad = function() {
    // GIVEN
    var vessel = new Vessel('Yandex', [0, 0], 1000);
    // WHEN
    vessel.load(800);
    // THEN
    assertEquals(800, vessel.getOccupiedSpace());
    assertEquals(200, vessel.getFreeSpace());
    assertEquals('Ship "Yandex". Placement: 0,0. Occupied: 800 from 1000t.', vessel.report());
};

/**
 * Проверка выгрузки допустимого количества груза
 * @returns {undefined}
 */
VesselTest.prototype.testPartialUnload = function() {
    // GIVEN
    var vessel = new Vessel('Yandex', [0, 0], 1000);
    vessel.load(800);
    // WHEN
    var unloaded = vessel.unload(600);
    // THEN
    assertEquals(600, unloaded);
    assertEquals(200, vessel.getOccupiedSpace());
    assertEquals('Ship "Yandex". Placement: 0,0. Occupied: 200 from 1000t.', vessel.report());
};

/**
 * Проверка выгрузки завышенного количества груза
 * @returns {undefined}
 */
VesselTest.prototype.testOverheadUnload = function() {
    // GIVEN
    var vessel = new Vessel('Yandex', [0, 0], 1000);
    vessel.load(800);
    // WHEN
    var unloaded = vessel.unload(1000);
    // THEN
    assertEquals(800, unloaded);
    assertEquals(0, vessel.getOccupiedSpace());
    assertEquals('Ship "Yandex". Placement: 0,0. Occupied: 0 from 1000t.', vessel.report());
};

VesselTest.prototype.testFlyToSpace = function() {
    // GIVEN
    var vessel = new Vessel('Yandex', [0, 0], 1000);
    // WHEN
    vessel.flyTo([1,1]);
    // THEN
    assertEquals('Ship "Yandex". Placement: 1,1. Occupied: 0 from 1000t.', vessel.report());
};