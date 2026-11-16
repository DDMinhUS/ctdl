import React from 'react';

export type JavaTokenKind =
  | 'plain'
  | 'comment'
  | 'string'
  | 'keyword'
  | 'primitive'
  | 'type'
  | 'constant'
  | 'method'
  | 'number'
  | 'blank'
  | 'operator';

export interface JavaToken {
  kind: JavaTokenKind;
  text: string;
}

const KEYWORDS = new Set([
  'public',
  'private',
  'protected',
  'class',
  'interface',
  'extends',
  'implements',
  'static',
  'final',
  'void',
  'return',
  'if',
  'else',
  'for',
  'while',
  'do',
  'break',
  'continue',
  'switch',
  'case',
  'default',
  'new',
  'null',
  'true',
  'false',
  'this',
  'super',
  'throw',
  'throws',
  'import',
  'package',
  'instanceof',
]);

const PRIMITIVES = new Set(['int', 'boolean', 'double', 'float', 'long', 'char', 'byte', 'short']);

const TOKEN_CLASS: Record<JavaTokenKind, string> = {
  plain: 'text-slate-100',
  comment: 'text-slate-500',
  string: 'text-emerald-300',
  keyword: 'text-violet-400',
  primitive: 'text-cyan-300',
  type: 'text-amber-200',
  constant: 'text-orange-300',
  method: 'text-sky-300',
  number: 'text-orange-300',
  blank: 'text-amber-300 bg-amber-400/20 rounded-[2px]',
  operator: 'text-slate-400',
};

/** Tokenize Java source lines while preserving multi-line block comment state. */
export function tokenizeJavaLines(code: string): JavaToken[][] {
  const lines = code.split('\n');
  const result: JavaToken[][] = [];
  let inBlockComment = false;

  for (const line of lines) {
    const tokens: JavaToken[] = [];
    let i = 0;
    const n = line.length;

    const push = (kind: JavaTokenKind, text: string) => {
      if (!text) return;
      const last = tokens[tokens.length - 1];
      if (last && last.kind === kind && kind !== 'blank') {
        last.text += text;
      } else {
        tokens.push({ kind, text });
      }
    };

    while (i < n) {
      if (inBlockComment) {
        const end = line.indexOf('*/', i);
        if (end === -1) {
          push('comment', line.slice(i));
          i = n;
        } else {
          push('comment', line.slice(i, end + 2));
          i = end + 2;
          inBlockComment = false;
        }
        continue;
      }

      const ch = line[i];

      // Block comment start
      if (ch === '/' && line[i + 1] === '*') {
        const end = line.indexOf('*/', i + 2);
        if (end === -1) {
          push('comment', line.slice(i));
          inBlockComment = true;
          i = n;
        } else {
          push('comment', line.slice(i, end + 2));
          i = end + 2;
        }
        continue;
      }

      // Line comment
      if (ch === '/' && line[i + 1] === '/') {
        push('comment', line.slice(i));
        i = n;
        continue;
      }

      // String or char literal
      if (ch === '"' || ch === "'") {
        let j = i + 1;
        while (j < n) {
          if (line[j] === '\\' && j + 1 < n) {
            j += 2;
            continue;
          }
          if (line[j] === ch) {
            j++;
            break;
          }
          j++;
        }
        push('string', line.slice(i, j));
        i = j;
        continue;
      }

      // Fill-in-the-blank placeholder `___`
      if (line.startsWith('___', i)) {
        let j = i + 3;
        while (j < n && line[j] === '_') j++;
        push('blank', line.slice(i, j));
        i = j;
        continue;
      }

      // Whitespace
      if (/\s/.test(ch)) {
        let j = i + 1;
        while (j < n && /\s/.test(line[j])) j++;
        push('plain', line.slice(i, j));
        i = j;
        continue;
      }

      // Numbers (hex or decimal)
      if (/[0-9]/.test(ch)) {
        const numMatch = line.slice(i).match(/^(?:0x[0-9a-fA-F]+|\d+(?:\.\d+)?[lLfFdD]?)/);
        const tok = numMatch ? numMatch[0] : ch;
        push('number', tok);
        i += tok.length;
        continue;
      }

      // Identifiers & keywords
      if (/[A-Za-z_$]/.test(ch)) {
        let j = i + 1;
        while (j < n && /[A-Za-z0-9_$]/.test(line[j])) j++;
        const word = line.slice(i, j);

        if (KEYWORDS.has(word)) {
          push('keyword', word);
        } else if (PRIMITIVES.has(word)) {
          push('primitive', word);
        } else if (/^[A-Z][A-Z0-9_]+$/.test(word)) {
          push('constant', word);
        } else if (/^[A-Z]/.test(word)) {
          push('type', word);
        } else {
          // Check if followed by '(' -> method/function call or declaration
          let k = j;
          while (k < n && line[k] === ' ') k++;
          push(line[k] === '(' ? 'method' : 'plain', word);
        }
        i = j;
        continue;
      }

      // Operators / punctuation
      push('operator', ch);
      i++;
    }

    result.push(tokens);
  }

  return result;
}

export function renderTokenizedLine(tokens: JavaToken[]): React.ReactNode {
  if (tokens.length === 0) return ' ';
  return tokens.map((tok, idx) => (
    <span key={idx} className={TOKEN_CLASS[tok.kind]}>
      {tok.text}
    </span>
  ));
}

export const JavaCodeBlock: React.FC<{ code: string; className?: string }> = ({ code, className = '' }) => {
  const tokenized = React.useMemo(() => tokenizeJavaLines(code), [code]);
  return (
    <pre className={`font-mono ${className}`}>
      {tokenized.map((lineTokens, i) => (
        <div key={i} className="whitespace-pre">
          {lineTokens.length > 0 ? renderTokenizedLine(lineTokens) : ' '}
        </div>
      ))}
    </pre>
  );
};
