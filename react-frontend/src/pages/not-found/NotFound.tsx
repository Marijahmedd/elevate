import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-6">
            <div className="w-full max-w-md space-y-8 text-center">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2">
                    <div className="h-16 w-16 overflow-hidden">
                        <img
                            src="/logo.png"
                            alt="Elevate Logo"
                            className="h-full w-full object-cover scale-150"
                        />
                    </div>
                    <h1 className="text-3xl font-bold">Elevate.</h1>
                </div>

                <div className="space-y-4">
                    <h2 className="text-9xl font-bold text-muted-foreground">404</h2>
                    <h3 className="text-3xl font-bold">Page Not Found</h3>
                    <p className="text-muted-foreground">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <Button
                    onClick={() => navigate('/')}
                    className="w-full max-w-xs"
                >
                    Back to Home
                </Button>
            </div>
        </div>
    )
}

export default NotFound