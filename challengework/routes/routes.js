// Users Routes
app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Other user routes: GET /api/users/:userId, POST /api/users, PUT /api/users/:userId, DELETE /api/users/:userId, POST /api/users/:userId/friends/:friendId, DELETE /api/users/:userId/friends/:friendId
  
  // Thoughts Routes
  app.get('/api/thoughts', async (req, res) => {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });