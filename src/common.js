export const host = '/';

export const baseAuthApiUrl = host + 'api-auth/';
export const baseApiUrl = host + 'api-bukkake/';
export const baseActionApiUrl = host + 'api-actions/';

export const loginUrl = baseAuthApiUrl + 'login/';
export const signupUrl = baseAuthApiUrl + 'signup/';
export const profileUrl = (userId) => baseAuthApiUrl + `profile/${userId}`;
export const bukkakesUrl = baseApiUrl + 'bukkakes/';
export const bukkakeUrl = (id) => baseApiUrl + `bukkakes/${id}`;

export const getHeader = function () {
  const access_token = window.localStorage.getItem('token');
  const headers = {
    'Accept': 'application/json',
    'Authorization': 'Token ' + access_token
  };
  return headers
};

export const getCookie = function (name) {
  var value;
  if (document.cookie && document.cookie !== '') {
      document.cookie.split(';').forEach(function (c) {
          var m = c.trim().match(/(\w+)=(.*)/);

          if(m !== undefined && m[1] == name) {
              value = decodeURIComponent(m[2]);
          }
      });
  }
  return value;
}
