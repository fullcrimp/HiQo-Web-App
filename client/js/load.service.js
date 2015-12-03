
app.factory('fileReader', ['$q', '$log', 'sourceImage', '$rootScope', function ($q, $log, sourceImage, $rootScope) {

    var onLoad = function(reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
                sourceImage.set(reader.result);
                $rootScope.$broadcast('fileLoad');
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function(reader, scope) {
        return function (event) {
            scope.$broadcast('fileProgress',
            {
                total: event.total,
                loaded: event.loaded
            });
        };
    };

    var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();

        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);

        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL
    };
}])


/**
* [service description]
* @param  {[type]} 'sourceImage' [description]
* @param  {[type]} function      (             [description]
* @return {[type]}               [description]
*/
app.service('sourceImage', function () {
    var src;

    return {
        get: function () {
            return src;
        },
        set: function(value) {
            console.log(value);
            src = value;
        }
    };
});
