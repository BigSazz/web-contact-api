/**
 * ContactController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   * `ContactController.create()`
   */
  create: async function(req, res) {
    try {
      let { name, email, mobile } = req.body;
      let errors = {}
      if (!name) {
        { errors.name= 'please provide a contact name' }
        return res.status(400).json(errors.name);
      }
      if (!email) {
        { errors.email= 'please provide a contact email' }
        return res.status(400).json(errors.email);
      }
      if (!mobile) {
        { errors.mobile ='please provide a contact mobile' }
        return res.status(400).json(errors.mobile);
      }
      const newContact = await Contact.create({
        name,
        email,
        mobile
      });
      return res.ok(newContact);
    } catch (err) {
      res.serverError(err);
    }
  },

  /**
   * `ContactController.find()`
   */
  find: async function(req, res) {
    try {
      const results = await Contact.find();
      return res.status(200).json(results);
    } catch (err) {
      return res.serverError(err);
    }
  },

  /**
   * `ContactController.findOne()`
   */
  findOne: async function(req, res) {
    try {
      const result = await Contact.findOne({ id: req.params.id });
      return res.status(200).json(result);
    } catch (err) {
      return res.serverError(err);
    }
  },

  /**
   * `ContactController.update()`
   */
  update: async function(req, res) {
    try {
      let params = req.allParams();
      let contactUpdate = {};
      if (params.name) {
        contactUpdate.name = params.name;
      }
      if (params.email) {
        contactUpdate.email = params.email;
      }
      if (params.mobile) {
        contactUpdate.mobile = params.mobile;
      }
      const result = await Contact.update({ id: req.params.id }, contactUpdate);
      return res.ok(result);
    } catch (err) {
      return res.serverError(err);
    }
  },

  /**
   * `ContactController.delete()`
   */
  delete: async function(req, res) {
    try {
      const result = await Contact.destroy({ id: req.params.id });
      return res.ok(result);
    } catch (err) {
      return res.serverError(err);
    }
  }
};
