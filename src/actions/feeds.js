import * as types from "../constants/feeds";
import Api from "./../utils/api";

/**
 * Permet de créer une nouvelle source
 * @param {string} name - Le nom de la source
 * @param {object} options - Les paramètres initiaux de la source
 */
export const addSource = (name, url, options) => ({
  type: types.addSource,
  name,
  url,
  options
});

/**
 * Permet d'ajouter des feeds à une source
 * @param {string} name - Le nom de la source
 * @param {object} feeds - La liste des feeds
 */
export const addFeeds = (name, feeds) => ({
  type: types.addFeeds,
  name,
  feeds
});

/**
 * Permet d'ajouter des feeds à une source
 * @param {string} name - Le nom de la source
 * @param {object} feeds - La liste des feeds
 */
export const selectSource = name => ({
  type: types.selectSource,
  name,
  meta: {
    amplitude: {
      name
    }
  }
});

/**
 * Permet d'ajouter des feeds à une source
 * @param {string} name - Le nom de la source
 * @param {object} feeds - La liste des feeds
 */
export const fetchingSource = name => ({
  type: types.fetchingSource,
  name
});

/**
 * Permet d'ajouter des feeds à une source
 * @param {string} name - Le nom de la source
 * @param {object} feeds - La liste des feeds
 */
export const fetchEndSource = name => ({
  type: types.fetchEndSource,
  name
});

/**
 * Permet d'ajouter des feeds à une source
 * @param {string} name - Le nom de la source
 * @param {object} feeds - La liste des feeds
 */
export const fetchSource = name => (dispatcher, getState) => {
  const { feeds } = getState();
  const source = feeds.sources[name];

  /* istanbul ignore next */
  if (!source)
    return Promise.reject(`The source with name ${name} does not exist`);

  if (source.feeds.length > 0) return Promise.resolve();

  dispatcher(fetchingSource(name));

  return Api.getFeeds(name.toLocaleLowerCase()).then(response => {
    dispatcher(addFeeds(name, response));
    return dispatcher(fetchEndSource(name));
  });
};
