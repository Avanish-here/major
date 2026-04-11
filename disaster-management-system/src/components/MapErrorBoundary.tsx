import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class MapErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: undefined,
    errorInfo: undefined,
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Map rendering error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-rose-500 bg-rose-950/40 p-4 text-sm text-rose-100">
          <p className="font-semibold">Unable to render map.</p>
          <p className="mt-1 text-xs text-rose-200">
            <span className="font-semibold">{this.state.error?.name}:</span>{' '}
            {this.state.error?.message ?? 'An unknown error occurred.'}
          </p>
          {this.state.error?.stack && (
            <div className="mt-2 text-xs text-rose-200">
              <p className="font-semibold">JavaScript stack (full):</p>
              <pre className="mt-1 max-h-52 overflow-auto rounded bg-slate-950/30 p-2 text-[11px]">
                {this.state.error.stack}
              </pre>
            </div>
          )}
          {this.state.errorInfo?.componentStack && (
            <details className="mt-2 text-xs text-rose-200">
              <summary className="cursor-pointer">React component stack</summary>
              <pre className="mt-1 max-h-40 overflow-auto text-[11px]">
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
