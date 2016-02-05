/* global Bridge */

/** @namespace LiveApp */

/**
 * Creates a simple init class for our Application
 *
 * @public
 * @class LiveApp.App
 */
Bridge.define('LiveApp.App', {
    statics: {
        config: {
            init: function () {
                Bridge.ready(this.main);
            }
        },
        main: function () {
            var $t;
            var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var q = Bridge.Linq.Enumerable.from(alphabet).select(function (x) {
                return String.fromCharCode(x);
            });

            var size = 2;
            for (var i = 0; i < size - 1; i++) 
                (function () {
                    q = q.selectMany(function (x) {
                        return alphabet;
                    }, function (x, y) {
                        return x + y;
                    });
                }).call(this);

            $t = Bridge.getEnumerator(q);
            while ($t.moveNext()) {
                var item = $t.getCurrent();
                console.log(item);
            }

        }
    }
});