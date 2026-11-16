import type { ModuleContent } from '../types/training';
import { modules01to04 } from './modules/modules01to04';
import { modules05to07 } from './modules/modules05to07';
import { modules08to10 } from './modules/modules08to10';

export const modules: ModuleContent[] = [
  ...modules01to04,
  ...modules05to07,
  ...modules08to10,
].sort((a, b) => a.id - b.id);

export function getModuleById(id: number): ModuleContent | undefined {
  return modules.find((mod) => mod.id === id);
}
