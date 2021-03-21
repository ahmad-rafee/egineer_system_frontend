const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')

module.exports = {
  // ... other options ...

  plugins: [
    new VueAutoRoutingPlugin({
      // Path to the directory that contains your page components.
      pages: 'src/views',

      // A string that will be added to importing component path (default @/pages/).
      importPrefix: '@/views/'
    })
  ]
}