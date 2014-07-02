import when = require('when')

export function getValue(transform? : (string) => string) : when.Promise<string> {
	var result = when.resolve("Hello, World!")
	if (transform !== undefined) {
		result = result.then(transform)
	}
	return result
}
