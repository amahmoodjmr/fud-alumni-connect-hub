
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Receipt, Clock, CheckCircle, X, Calendar, AlertCircle, CreditCard as CardIcon, Building } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import 'react-credit-cards/es/styles-compiled.css';

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
  }
];

const PaymentsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      console.log('Payment data:', data);
      toast.success('Payment processed successfully!');
      setIsSubmitting(false);
      reset();
      // Redirect to dashboard after successful payment
      navigate('/alumni/dashboard');
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
                          <Select defaultValue="dues">
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
                            defaultValue={2500}
                            readOnly
                            className="bg-gray-100"
                            {...register("amount", { required: true, min: 100 })}
                          />
                        </div>
                        
                        <div className="col-span-2 md:col-span-1">
                          <Label htmlFor="purpose">Purpose</Label>
                          <Input 
                            id="purpose" 
                            value="Annual Alumni Dues" 
                            readOnly 
                            className="bg-gray-100"
                          />
                        </div>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Payment Methods</h3>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div className={`border rounded-md p-4 ${paymentMethod === 'card' ? 'border-fud-green' : ''}`}>
                            <div className="flex items-center space-x-2">
                              <input 
                                type="radio" 
                                id="card" 
                                name="paymentMethod" 
                                value="card" 
                                checked={paymentMethod === 'card'}
                                onChange={() => setPaymentMethod('card')}
                              />
                              <Label htmlFor="card" className="flex items-center">
                                <CardIcon className="mr-2 h-4 w-4" />
                                Credit/Debit Card
                              </Label>
                            </div>
                            
                            {paymentMethod === 'card' && (
                              <div className="mt-4 space-y-4">
                                <div>
                                  <Label htmlFor="cardNumber">Card Number</Label>
                                  <Input 
                                    id="cardNumber"
                                    placeholder="0000 0000 0000 0000"
                                    {...register("cardNumber", { required: paymentMethod === 'card' })}
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
                                      {...register("expiryDate", { required: paymentMethod === 'card' })}
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
                                      {...register("cvv", { required: paymentMethod === 'card' })}
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
                                    {...register("cardName", { required: paymentMethod === 'card' })}
                                    className={errors.cardName ? "border-red-500" : ""}
                                  />
                                  {errors.cardName && (
                                    <p className="text-red-500 text-xs mt-1">Name on card is required</p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className={`border rounded-md p-4 ${paymentMethod === 'transfer' ? 'border-fud-green' : ''}`}>
                            <div className="flex items-center space-x-2">
                              <input 
                                type="radio" 
                                id="bankTransfer" 
                                name="paymentMethod" 
                                value="transfer"
                                checked={paymentMethod === 'transfer'}
                                onChange={() => setPaymentMethod('transfer')}
                              />
                              <Label htmlFor="bankTransfer" className="flex items-center">
                                <Building className="mr-2 h-4 w-4" />
                                Bank Transfer
                              </Label>
                            </div>
                            
                            {paymentMethod === 'transfer' && (
                              <div className="mt-4 space-y-4">
                                <div className="bg-gray-50 p-4 rounded-md">
                                  <h4 className="font-medium mb-2">Bank Transfer Details</h4>
                                  <p className="text-sm mb-1"><strong>Bank:</strong> FUD Alumni Bank</p>
                                  <p className="text-sm mb-1"><strong>Account Number:</strong> 0123456789</p>
                                  <p className="text-sm mb-1"><strong>Account Name:</strong> FUD Alumni Association</p>
                                  <p className="text-sm mb-1"><strong>Reference:</strong> Alumni-{Math.floor(Math.random() * 100000)}</p>
                                </div>
                                
                                <div>
                                  <Label htmlFor="transferRef">Enter Transfer Reference</Label>
                                  <Input 
                                    id="transferRef"
                                    placeholder="Enter the reference used for your transfer"
                                    {...register("transferRef", { required: paymentMethod === 'transfer' })}
                                    className={errors.transferRef ? "border-red-500" : ""}
                                  />
                                  {errors.transferRef && (
                                    <p className="text-red-500 text-xs mt-1">Transfer reference is required</p>
                                  )}
                                </div>
                                
                                <div>
                                  <Label htmlFor="transferDate">Date of Transfer</Label>
                                  <Input 
                                    id="transferDate"
                                    type="date"
                                    {...register("transferDate", { required: paymentMethod === 'transfer' })}
                                    className={errors.transferDate ? "border-red-500" : ""}
                                  />
                                  {errors.transferDate && (
                                    <p className="text-red-500 text-xs mt-1">Transfer date is required</p>
                                  )}
                                </div>
                              </div>
                            )}
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
                        <span className="font-medium">₦2,500</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Processing Fee</span>
                        <span className="font-medium">₦0</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center font-bold">
                        <span>Total</span>
                        <span>₦2,500</span>
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
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PaymentsPage;
