function factory(version) {
    var locales = {};
    var globalLocale = null;

    var moment = function(ms) {
        if (ms == null) {
            ms = Date.now();
        }
        return new Moment(ms, globalLocale);
    };
    moment.version = version || 'baby moment UMD';
    moment.defineLocale = function (name, config) {
        console.log('defining locale', name, config);
        locales[name] = config;
    };
    moment.locale = function (newLocale) {
        if (newLocale == null) {
            return globalLocale;
        }
        if (locales[newLocale] != null) {
            globalLocale = newLocale;
        }
        return globalLocale;
    }
    moment.isMoment = function (obj) {
        return obj instanceof Moment;
    }

    function Moment(ms, locale) {
        this._ms = ms;
        this._locale = locale;
    }

    Moment.prototype.valueOf = function() {
        return this._ms;
    };
    Moment.prototype.locale = function (newLocale) {
        if (newLocale == null) {
            return this._locale;
        }
        if (locales[newLocale] != null) {
            this._locale = newLocale;
        }
        return this;
    };
    Moment.prototype.hi = function () {
        return locales[this._locale].hi;
    };

    moment.defineLocale('en', { hi: 'Hello' });
    moment.locale('en');

    return moment;
}
