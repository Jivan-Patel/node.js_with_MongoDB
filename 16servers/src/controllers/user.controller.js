const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      msg:   'Users fetched successfully.',
      count: users.length,
      users,
    });

  } catch (error) {
    res.status(500).json({ msg: 'Server error.', error: error.message });
  }
};

module.exports = { getAllUsers };