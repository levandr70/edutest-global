import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="mb-6">Page Not Found</h1>
          <p className="text-xl text-neutral-600 mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/" variant="primary">
              Return Home
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}










