import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, CreditCard, Lock, Shield } from "lucide-react";
import { useState } from "react";

interface CheckoutPageProps {
  product: "prompts" | "course";
  onProcessPayment: (paymentData: any) => void;
}

export const CheckoutPage = ({
  product,
  onProcessPayment,
}: CheckoutPageProps) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const productDetails = {
    prompts: {
      name: "AI Prompt Swipe Vault",
      price: 17,
      originalPrice: 47,
      description: "300+ High-Converting AI Prompts",
    },
    course: {
      name: "2025 Affiliate Marketing Breakthrough",
      price: 197,
      originalPrice: 497,
      description: "Complete System + Bonuses",
    },
  };

  const currentProduct = productDetails[product];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would integrate with Stripe, PayPal, etc.
    onProcessPayment({ ...formData, product });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Secure Checkout</h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>256-bit SSL Encryption</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Order Summary */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {currentProduct.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {currentProduct.description}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="line-through text-muted-foreground">
                        €{currentProduct.originalPrice}
                      </span>
                    </div>
                    <div className="flex justify-between text-success">
                      <span>Discount:</span>
                      <span>
                        -€{currentProduct.originalPrice - currentProduct.price}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span>€{currentProduct.price}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Guarantees */}
              <Card className="p-6 bg-gradient-to-br from-success/5 to-success/10 border-success/20">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success" />
                  Your Purchase is Protected
                </h3>
                <div className="space-y-3">
                  {[
                    "60-Day Money Back Guarantee",
                    "Instant Digital Delivery",
                    "Secure Payment Processing",
                    "24/7 Customer Support",
                  ].map((guarantee, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">{guarantee}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Payment Methods */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Accepted Payment Methods</h3>
                <div className="flex items-center gap-4">
                  <div className="px-3 py-2 bg-muted rounded text-sm">Visa</div>
                  <div className="px-3 py-2 bg-muted rounded text-sm">
                    Mastercard
                  </div>
                  <div className="px-3 py-2 bg-muted rounded text-sm">
                    PayPal
                  </div>
                  <div className="px-3 py-2 bg-muted rounded text-sm">
                    Stripe
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Payment Form */}
            <div>
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Contact Information</h3>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        placeholder="Your country"
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Payment Information</h3>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          handleInputChange("cardNumber", e.target.value)
                        }
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">MM/YY</Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            handleInputChange("expiryDate", e.target.value)
                          }
                          placeholder="12/25"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) =>
                            handleInputChange("cvv", e.target.value)
                          }
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={(e) =>
                          handleInputChange("nameOnCard", e.target.value)
                        }
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="cta"
                    size="xl"
                    className="w-full"
                  >
                    Complete Purchase - €{currentProduct.price}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By completing your purchase, you agree to our Terms of
                    Service and Privacy Policy. This is a secure, encrypted
                    transaction.
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
