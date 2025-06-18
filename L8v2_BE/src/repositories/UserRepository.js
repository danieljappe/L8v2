const User = require('../models/User');

class UserRepository {
  async create(userData) {
    return User.create(userData);
  }

  async findById(id) {
    return User.findByPk(id);
  }

  async findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async findByUsername(username) {
    return User.findOne({ where: { username } });
  }

  async update(id, userData) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.update(userData);
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }

  async findAll(options = {}) {
    return User.findAll(options);
  }

  async findActive() {
    return User.findAll({ where: { isActive: true } });
  }

  async findAdmins() {
    return User.findAll({ where: { role: 'admin' } });
  }

  async updateLastLogin(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.update({ lastLogin: new Date() });
  }
}

module.exports = new UserRepository(); 