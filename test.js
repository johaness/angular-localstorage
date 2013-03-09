describe('localstorage', function() {

    $localstorage = angular.injector(['localstorage']).get('$localstorage');

    var s0, s1, s2, j = JSON.stringify;

    function clear_storage() {
        for (k in window.localStorage) {
            window.localStorage.removeItem(k);
        }
    }

    beforeEach(function() {
        clear_storage();
        s0 = $localstorage();
        s1 = $localstorage('one');
        s2 = $localstorage('two');
    });
    afterEach(function() {
        clear_storage();
    });

    it('should start with an empty storage', function() {
        expect(j(s0.list())).toEqual("{}");
        expect(j(s1.list())).toEqual("{}");
        expect(j(s2.list())).toEqual("{}");
        expect(window.localStorage.length).toEqual(0);
    });

    it('should store a string and retrieve it with no key given', function() {
        var s = "Hello World";
        s1.set('', s);
        expect(s1.get('')).toEqual(s);
        expect(window.localStorage.length).toEqual(1);
    });

    it('should have exactly one key after adding one key', function() {
        s1.set('', '');
        expect(j(s1.list())).toEqual('{"":""}');
        expect(window.localStorage.length).toEqual(1);
    });

    it('should not affect stores with different namespaces', function() {
        s1.set('', '');
        expect(j(s2.list())).toEqual("{}");
        expect(window.localStorage.length).toEqual(1);
    });

    it('should affect stores with a shared namespaces', function() {
        s1.set('', '');
        expect(j(s0.list())).toEqual('{"one":""}');
        expect(window.localStorage.length).toEqual(1);
    });

    it('should have exactly one key after adding the same key twice', function() {
        s1.set('a', '1');
        s1.set('a', '2');
        expect(j(s1.list())).toEqual('{"a":"2"}');
        expect(window.localStorage.length).toEqual(1);
    });

    it('should have no keys after removing the only key', function() {
        s1.set('a', '1');
        s1.remove('a')
        expect(j(s1.list())).toEqual('{}');
        expect(j(s0.list())).toEqual('{}');
        expect(window.localStorage.length).toEqual(0);
    });

    it('should removing the right key, keep all others', function() {
        s1.set('a', '1');
        s1.set('b', '2');
        s1.set('c', '3');
        s1.remove('b')
        expect(s1.get('a')).toEqual('1');
        expect(s1.get('b')).toEqual(undefined);
        expect(s1.get('c')).toEqual('3');
        expect(window.localStorage.length).toEqual(2);
    });

    it('should be able to store objects just fine', function() {
        var a = {a: 1, b: 2, c: "3"};
        s1.set('', a);
        expect(s1.get('').a).toEqual(1);
        expect(s1.get('').b).toEqual(2);
        expect(s1.get('').c).toEqual("3");
        expect(window.localStorage.length).toEqual(1);
    });
});
