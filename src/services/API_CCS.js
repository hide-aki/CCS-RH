import AuthService from "./AuthService";

const hostURLProd = "https://api.ccscontactcenter.com";
// eslint-disable-next-line
const hostURLDev = "http://localhost:3020";

export default class API_CCS {
  constructor() {
    this.Auth = new AuthService();
    this.fetch = this.fetch.bind(this);
  }

  async fetch(url, options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    if (await this.Auth.loggedIn()) {
      headers["Authorization"] = "Bearer " + (await this.Auth.getToken());
    } else {
      window.location.href = "/login";
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  async fetchAnonimo(url, options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  getCampaignAvatar(id) {
    return this.fetch(hostURLProd + "/v1/Campaigns/Avatar?id=" + id, {
      method: "GET"
    }).then(res => {
      return Promise.resolve(res);
    });
  }
  getNavigationMenu(user) {
    return this.fetch(hostURLProd + "/v1/catalogs/menu", {
      method: "GET"
    }).then(res => {
      return Promise.resolve(res);
    });
  }

  getColonias(Estado, Municipio) {
    return this.fetchAnonimo(
      hostURLProd +
        "/v1/catalogs/colonias?estado=" +
        Estado +
        "&municipio=" +
        Municipio,
      {
        method: "GET"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  getMunicipios(Estado) {
    return this.fetchAnonimo(
      hostURLProd + "/v1/catalogs/municipios?estado=" + Estado,
      {
        method: "GET"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  getCP(CP) {
    return this.fetchAnonimo(hostURLProd + "/v1/catalogs/codigo_postal/" + CP, {
      method: "GET"
    }).then(res => {
      return Promise.resolve(res);
    });
  }

  getClaveEstado(Estado) {
    return this.fetchAnonimo(
      hostURLProd + "/v1/catalogs/clavesEstados/" + Estado,
      {
        method: "GET"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  insertCandidato(state) {
    return this.fetchAnonimo(
      hostURLProd + "/v1/personal/candidatos",
      {
        method: "POST",
        body: JSON.stringify(state)
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }
}
