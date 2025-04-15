
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Receipt, Clock, CheckCircle, X, Calendar, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

// Sample payment history data
const paymentHistory = [
  {
    id: 'PAY-12345',
    type: 'Annual Dues',
    amount: 5000,
    date: '2023-03-15',
    status: 'completed',
    reference: 'REF-8765432'
  },
  {
    id: 'PAY-12346',
    type: 'Event Registration',
    amount: 2500,
    date: '2023-02-10',
    status: 'completed',
    reference: 'REF-8765433'
  },
  {
    id: 'PAY-12347',
    type: 'Donation',
    amount: 10000,
    date: '2023-01-05',
    status: 'completed',
    reference: 'REF-8765434'
  },
  {
    id: 'PAY-12348',
    type: 'Special Project',
    amount: 7500,
    date: '2022-12-20',
    status: 'completed',
    reference: 'REF-8765435'
  }
];

const PaymentsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      console.log('Payment data:', data);
      toast.success('Payment initiated successfully!');
      setIsSubmitting(false);
      reset();
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Alumni Payments</h1>
        
        <Tabs defaultValue="make-payment">
          <TabsList className="mb-6">
            <TabsTrigger value="make-payment">Make a Payment</TabsTrigger>
            <TabsTrigger value="payment-history">Payment History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="make-payment">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>
                      Enter your payment details below
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="col-span-2">
                          <Label htmlFor="paymentType">Payment Type</Label>
                          <Select>
                            <SelectTrigger id="paymentType">
                              <SelectValue placeholder="Select payment type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dues">Annual Dues</SelectItem>
                              <SelectItem value="event">Event Registration</SelectItem>
                              <SelectItem value="donation">Donation</SelectItem>
                              <SelectItem value="project">Special Project</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="col-span-2 md:col-span-1">
                          <Label htmlFor="amount">Amount (₦)</Label>
                          <Input 
                            id="amount"
                            type="number"
                            {...register("amount", { required: true, min: 100 })}
                            className={errors.amount ? "border-red-500" : ""}
                          />
                          {errors.amount && (
                            <p className="text-red-500 text-xs mt-1">Valid amount is required</p>
                          )}
                        </div>
                        
                        <div className="col-span-2 md:col-span-1">
                          <Label htmlFor="purpose">Purpose (Optional)</Label>
                          <Input id="purpose" {...register("purpose")} />
                        </div>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Payment Methods</h3>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div className="border rounded-md p-4">
                            <div className="flex items-center space-x-2">
                              <input 
                                type="radio" 
                                id="card" 
                                name="paymentMethod" 
                                value="card" 
                                defaultChecked
                              />
                              <Label htmlFor="card" className="flex items-center">
                                <CreditCard className="mr-2 h-4 w-4" />
                                Credit/Debit Card
                              </Label>
                            </div>
                            
                            <div className="mt-4 space-y-4">
                              <div>
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input 
                                  id="cardNumber"
                                  placeholder="0000 0000 0000 0000"
                                  {...register("cardNumber", { required: true })}
                                  className={errors.cardNumber ? "border-red-500" : ""}
                                />
                                {errors.cardNumber && (
                                  <p className="text-red-500 text-xs mt-1">Card number is required</p>
                                )}
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="expiryDate">Expiry Date</Label>
                                  <Input 
                                    id="expiryDate"
                                    placeholder="MM/YY"
                                    {...register("expiryDate", { required: true })}
                                    className={errors.expiryDate ? "border-red-500" : ""}
                                  />
                                  {errors.expiryDate && (
                                    <p className="text-red-500 text-xs mt-1">Expiry date is required</p>
                                  )}
                                </div>
                                
                                <div>
                                  <Label htmlFor="cvv">CVV</Label>
                                  <Input 
                                    id="cvv"
                                    placeholder="123"
                                    {...register("cvv", { required: true })}
                                    className={errors.cvv ? "border-red-500" : ""}
                                  />
                                  {errors.cvv && (
                                    <p className="text-red-500 text-xs mt-1">CVV is required</p>
                                  )}
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor="cardName">Name on Card</Label>
                                <Input 
                                  id="cardName"
                                  placeholder="John Doe"
                                  {...register("cardName", { required: true })}
                                  className={errors.cardName ? "border-red-500" : ""}
                                />
                                {errors.cardName && (
                                  <p className="text-red-500 text-xs mt-1">Name on card is required</p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="border rounded-md p-4 opacity-50">
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="bankTransfer" name="paymentMethod" value="transfer" disabled />
                              <Label htmlFor="bankTransfer">Bank Transfer</Label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">This option is currently unavailable</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          type="submit"
                          className="w-full bg-fud-green hover:bg-fud-green-dark"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="mr-2 animate-spin">○</span>
                              Processing...
                            </>
                          ) : (
                            'Make Payment'
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Annual Dues (2023)</span>
                        <span className="font-medium">₦5,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Processing Fee</span>
                        <span className="font-medium">₦100</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center font-bold">
                        <span>Total</span>
                        <span>₦5,100</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 text-fud-green" />
                      <p className="text-gray-600">
                        Your payment is secure and encrypted. All transactions are processed through our secure payment gateway.
                      </p>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>If you have any questions or encounter any issues with your payment, please contact the alumni office:</p>
                      <p><strong>Email:</strong> payments@fudalumni.org</p>
                      <p><strong>Phone:</strong> +234 123 456 7890</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="payment-history">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>View your past payments and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paymentHistory.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦{payment.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(payment.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {payment.status === 'completed' ? (
                                <CheckCircle className="h-4 w-4 mr-1" />
                              ) : payment.status === 'pending' ? (
                                <Clock className="h-4 w-4 mr-1" />
                              ) : (
                                <X className="h-4 w-4 mr-1" />
                              )}
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.reference}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="bg-fud-green text-white">
                  <div className="flex items-center">
                    <Receipt className="h-5 w-5 mr-2" />
                    <CardTitle>Total Payments</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 text-center">
                  <div className="text-3xl font-bold mb-2">₦25,000</div>
                  <p className="text-sm text-gray-500">Lifetime contribution</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-fud-green text-white">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <CardTitle>Payment Status</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 text-center">
                  <div className="text-lg font-bold mb-2 text-green-500">Up to date</div>
                  <p className="text-sm text-gray-500">Annual dues paid for 2023</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-fud-green text-white">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    <CardTitle>Next Payment</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 text-center">
                  <div className="text-lg font-bold mb-2">January 15, 2024</div>
                  <p className="text-sm text-gray-500">Annual dues for 2024</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PaymentsPage;
