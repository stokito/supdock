import Command from 'commands';
import { traceFunction } from 'helpers/util';

@traceFunction()
export default class Ssh extends Command {
  constructor() {
    super('ssh');
  }

  public async determineShell() {
    return await this.prompt('Which shell is the container using?', [
      'bash',
      'ash',
    ]);
  }

  public async execute() {
    const { choice } = await this.determineShell();
    const args = ['exec', '-ti', this.id.trim(), choice];
    return this.spawn('docker', args);
  }
}
