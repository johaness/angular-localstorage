angular.module('localstorage', []).factory('$localstorage', function() {
    return function(namespace) {

    var storage = window['localStorage'];

    if (!!!storage) return false;

    namespace = namespace || '';

    function raw_set(key, value) {
        storage.setItem(key, value);
    }
    
    function raw_get(key) {
        return storage.getItem(key);
    }

    function raw_list(key, filter) {
        var rgx = new RegExp("^" + key),
            results = {};
        for (var k in storage) {
            if (k.match(rgx))
                results[k.slice(namespace.length)] = 
                    filter ? filter(storage[k]) : storage[k];
        }
        return results;
    }

    return {
        namespace: namespace,

        get: function(key) {
            return JSON.parse(raw_get(namespace + key));
        },
        set: function(key, value) {
            raw_set(namespace + key, JSON.stringify(value));
        },
        list: function(key) {
            return raw_list(namespace + (key || ''), JSON.parse);
        },

        remove: function(key) {
            storage.removeItem(namespace + key);
        },

        get_string: function(key) {
            return raw_get(namespace + key);
        },
        set_string: function(key, value) {
            raw_set(namespace + key, value);
        },
        list_strings: function(key) {
            return raw_list(namespace + key);
        }
    };
    }});
