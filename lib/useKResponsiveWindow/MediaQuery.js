/**
 * Class representing a MediaQuery
 */
export default class MediaQuery {
  /**
   *Create a media query
   * @param {String} query - The query string
   * @param {CallableFunction} eventHandler - The event callback function
   */
  constructor(query, eventHandler) {
    this.query = query;
    this.eventHandler = eventHandler;
  }

  /**
   * @returns {Object} Media query list
   */
  get mediaQueryList() {
    return window.matchMedia(this.query);
  }

  /**
   * Check if Nuxt is server side rendering
   * @returns {Boolean}
   */
  isNuxtServerSideRendering() {
    return process && process.server;
  }

  /**
   * Start listening for media query events
   * @returns {Object} Containing mediaQueryList, eventHandler, and stopListening
   */
  startListening() {
    //Prevent function execution if Nuxt is server side rendering
    if (this.isNuxtServerSideRendering()) {
      return;
    }

    if (this.mediaQueryList.addEventListener) {
      this.mediaQueryList.addEventListener('change', this.eventHandler);
    } else {
      this.mediaQueryList.addListener(this.eventHandler);
    }
  }

  /**
   * Stop listening for media query events
   */
  stopListening() {
    if (this.mediaQueryList.removeEventListener) {
      this.mediaQueryList.removeEventListener('change', this.eventHandler);
    } else {
      this.mediaQueryList.removeListener(this.eventHandler);
    }
  }
}
