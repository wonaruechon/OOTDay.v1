/**
 * RAG & Guardrail Logger
 * Structured logging for RAG retrievals and guardrail events
 */

export type LogLevel = 'info' | 'warn' | 'error';
export type EventType = 'retrieval' | 'pre_validation' | 'post_validation' | 'regeneration' | 'error';

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  eventType: EventType;
  data: any;
}

const logs: LogEntry[] = [];
const MAX_LOGS = 1000;

/**
 * Log RAG event
 */
export function logRAGEvent(eventType: 'retrieval', data: any): void {
  addLog({
    timestamp: new Date(),
    level: 'info',
    eventType,
    data
  });

  // Console log for development
  console.log(`[RAG:${eventType}]`, JSON.stringify(data, null, 2));
}

/**
 * Log guardrail event
 */
export function logGuardrailEvent(eventType: 'pre_validation' | 'post_validation' | 'regeneration', data: any): void {
  addLog({
    timestamp: new Date(),
    level: eventType === 'regeneration' ? 'warn' : 'info',
    eventType,
    data
  });

  // Console log for development
  console.log(`[Guardrail:${eventType}]`, JSON.stringify(data, null, 2));
}

/**
 * Log error
 */
export function logError(message: string, error: any): void {
  addLog({
    timestamp: new Date(),
    level: 'error',
    eventType: 'error',
    data: { message, error: error instanceof Error ? error.message : error }
  });

  console.error(`[Error]`, message, error);
}

/**
 * Add log entry with size limit
 */
function addLog(entry: LogEntry): void {
  logs.push(entry);

  // Keep only recent logs
  if (logs.length > MAX_LOGS) {
    logs.shift();
  }
}

/**
 * Get all logs
 */
export function getAllLogs(): LogEntry[] {
  return [...logs];
}

/**
 * Get logs by event type
 */
export function getLogsByType(eventType: EventType): LogEntry[] {
  return logs.filter(log => log.eventType === eventType);
}

/**
 * Clear logs
 */
export function clearLogs(): void {
  logs.length = 0;
}

/**
 * Get log statistics
 */
export function getLogStats() {
  const stats: Record<EventType, number> = {
    retrieval: 0,
    pre_validation: 0,
    post_validation: 0,
    regeneration: 0,
    error: 0
  };

  for (const log of logs) {
    stats[log.eventType]++;
  }

  return stats;
}
