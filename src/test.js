var assertEqual = function (actual, expected, msg) {
    if (actual !== expected) {
        console.error(msg, ":", "expected: ", expected, " actual: ", actual);
    }
}

function testAll(bmoment) {
    assertEqual(bmoment.version, 'baby moment UMD', 'bmoment.version');
    assertEqual(bmoment.isMoment(bmoment()), true, 'isMoment(bmoment())');
    assertEqual(bmoment(500).valueOf(), 500, 'bmoment.valueOf()');
    // bmoment() // create a moment object for now
    // bmoment(unixMillis) // create from unix millis
    // bmoment().valueOf() // return unix epoch milliseconds
    assertEqual(bmoment.locale(), 'en', 'default global locale is en');
    assertEqual(bmoment().locale(), 'en', 'local defaults to global');
    assertEqual(bmoment().hi(), 'Hello', 'hi in en'); // return the hi string for the current global locale
    bmoment.defineLocale('XX', { hi: 'hi XX' }); // locale will only have translation for hi
    assertEqual(bmoment.locale('XX'), 'XX', 'switch locale to XX'); // switch global locale to 'XX', default is 'en', don't
    // chane if there is no such locale loaded (node.js may auto-load)
    assertEqual(bmoment.locale(), 'XX', 'get global'); // return the current global locale
    assertEqual(bmoment().locale(), 'XX', 'local now defaults to XX');
    assertEqual(bmoment().hi(), 'hi XX', 'hi in XX'); // return the hi string for the current global locale

    assertEqual(bmoment().locale('de').hi(), 'Hallo', 'hi in de');
    assertEqual(bmoment().locale('ru').hi(), 'Здравствуйте', 'hi in ru');

    console.log('everything looks good!');
}
