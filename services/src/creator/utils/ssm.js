let ssmInstance // The instance of SSM
const cacheTime = 30 * 60 * 1000 // 30 minutes * 60 seconds * 1000 milliseconds

export class SSM {
  constructor(names) {
    // Bind the functions
    this.loadParams = this.loadParams.bind(this)

    // Set the list of params
    this.listOfParams = names
    this.paramsLoaded = false
    this.store = {}
  }

  // This loads the list of params from SSM
  async loadParams() {
    // Set the SSM instance
    ssmInstance = ssmInstance || SSM.loadSSM()

    const res = await ssmInstance
      .getParameters({ Names: this.listOfParams, WithDecryption: true })
      .promise()

    res.Parameters.map(element => {
      this.store[element.Name] = element.Value
    })

    this.loadedAt = Date.now()
  }

  async getParam(name) {
    // Check if should update
    if (this.shouldUpdate()) {
      await this.loadParams()
      this.paramsLoaded = true
    }

    return this.store[name]
  }

  shouldUpdate() {
    // If params haven't been loaded yet, or time since last update is more than cache time
    return !this.paramsLoaded || Date.now() - this.loadedAt > cacheTime
  }

  static loadSSM() {
    const { SSM } = import('aws-sdk')
    return new SSM()
  }
}
