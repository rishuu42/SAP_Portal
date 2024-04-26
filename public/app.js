angular.module('sapPortalApp', [])
    .controller('MainController', function($scope, $http) {
        $scope.loginData = {};
        $scope.loginMessage = '';
        $scope.isLoggedIn = false;
        $scope.currentUser = null;

        $scope.login = function() {
            $http.post('/api/login', $scope.loginData)
                .then(function(response) {
                    $scope.isLoggedIn = true;
                    $scope.currentUser = response.data.user;
                    $scope.loginMessage = response.data.message;
                })
                .catch(function(error) {
                    $scope.loginMessage = 'Login failed. Please check your credentials.';
                    console.error(error);
                });
        };
    });
    angular.module('gradeCardApp', [])
    .controller('MainController', function($scope, $http) {
        $scope.semesters = [];
        $http.get('/api/semesters')
            .then(function(response) {
                $scope.semesters = response.data;
            })
            .catch(function(error) {
                console.error('Error fetching semesters:', error);
            });

        $scope.viewGrade = function() {
            if (!$scope.selectedSemester) {
                alert('Please select a semester');
                return;
            }

            const semester = $scope.selectedSemester;
            const url = `/api/grades/${semester}`;
            $http.get(url, { responseType: 'arraybuffer' })
                .then(function(response) {
                    const file = new Blob([response.data], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    $scope.pdfUrl = fileURL;
                })
                .catch(function(error) {
                    console.error('Error fetching grade card:', error);
                    $scope.pdfUrl = null; 
                    alert('The result is not declared for the selected semester.');
                });
        };
    });
    angular.module('gradeCardApp', [])
    .controller('MainController', function($scope, $http) {
        $scope.semesters = [];

        $http.get('/api/semesters')
            .then(function(response) {
                $scope.semesters = response.data;
            })
            .catch(function(error) {
                console.error('Error fetching semesters:', error);
            });

        $scope.viewGrade = function() {
            if (!$scope.selectedSemester) {
                alert('Please select a semester');
                return;
            }

            const semester = $scope.selectedSemester;
            const url = `/api/grades/${semester}`;

            $http.get(url, { responseType: 'blob' })
                .then(function(response) {
                    $scope.pdfUrl = url;
                })
                .catch(function(error) {
                    if (error.status === 404) {
                        alert(`Result is not declared yet for ${semester}`);
                    } else {
                        console.error('Error fetching grades:', error);
                    }
                });
        };
    });

angular.module('documentViewerApp', [])
    .controller('MainController', function($scope) {
        $scope.documents = [
            { name: 'Fee Receipt', url: './docs/FeeRecipt.pdf' },
            { name: 'Income Tax Certificate', url: './docs/IncomeTax.pdf' },
            { name: 'Percentage Letter', url: './docs/percentageletter.pdf' },
            { name: 'Requisition Format', url: './docs/requisitionformat.pdf' },
            { name: 'Feedback Instructions', url: './docs/FeedbackInstructions.pdf' }
        ];
        $scope.viewDocument = function() {
            if ($scope.selectedDocument) {
                $scope.documentUrl = $scope.selectedDocument.url;
                $scope.errorMessage = '';
            } else {
                $scope.documentUrl = '';
                $scope.errorMessage = 'Please select a document.';
            }
        };
    });
