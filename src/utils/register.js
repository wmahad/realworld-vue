import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export const registerGlobalComps = Vue => {
  const requireComponent = require.context(
    '@/components', // the relative path of the directory to search
    false, // subdirectories will not be searched
    /Base[A-Z]\w+\.(vue|js)$/ // regular expression that searches for components starting with "Base" and ending in .vue or .js
  )

  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    const componentName = upperFirst(
      camelCase(
        fileName.replace(/^\.\/(.*)\.\w+$/, '$1') // removes what's before and after the filename itself
      )
    )

    // Register component globally
    Vue.component(
      componentName,
      // Look for the component options on `.default`, which will
      // exist if the component was exported with `export default`,
      // otherwise fall back to module's root.
      componentConfig.default || componentConfig
    )
  })
}
