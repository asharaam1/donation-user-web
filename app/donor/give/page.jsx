import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Separator } from '../../components/ui/separator';
import DonationCard from '../../components/DonationCard';
import { getDocs, processDonation } from '../../lib/firebase';
import { useToast } from '../../hooks/use-toast';

const Index = () => {
    // State management for the donation platform
    const [fundRequests, setFundRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [donationAmount, setDonationAmount] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const { toast } = useToast();

    // Fetch fund requests on component mount
    useEffect(() => {
        const fetchFundRequests = async () => {
            try {
                setIsLoading(true);
                setError('');
                console.log('Fetching fund requests...');

                const requests = await getDocs();
                setFundRequests(requests);
                console.log(`Successfully loaded ${requests.length} fund requests`);
            } catch (err) {
                console.error('Error fetching fund requests:', err);
                setError('Failed to load fund requests. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFundRequests();
    }, []);

    // Handle selecting a fund request
    const handleSelectRequest = (request) => {
        setSelectedRequest(request);
        setDonationAmount('');
        setError('');
        console.log(`Selected request: ${request.needyName} (ID: ${request.id})`);
    };

    // Validate donation amount
    const validateDonation = () => {
        if (!selectedRequest) {
            setError('Please select a fund request first.');
            return false;
        }

        const amount = parseFloat(donationAmount);

        if (isNaN(amount) || amount <= 0) {
            setError('Please enter a valid donation amount greater than $0.');
            return false;
        }

        const remainingAmount = selectedRequest.amountRequested - selectedRequest.amountRaised;
        if (amount > remainingAmount) {
            setError(`Donation amount cannot exceed the remaining needed amount of $${remainingAmount.toLocaleString()}.`);
            return false;
        }

        return true;
    };

    // Handle donation submission
    const handleDonate = async () => {
        if (!validateDonation()) return;

        try {
            setIsProcessing(true);
            setError('');

            const amount = parseFloat(donationAmount);
            console.log(`Donated $${amount} to ${selectedRequest.needyName} (Request ID: ${selectedRequest.id})`);

            // Process the donation
            await processDonation(selectedRequest.id, amount);

            // Update local state to reflect the donation
            setFundRequests(prevRequests =>
                prevRequests.map(req =>
                    req.id === selectedRequest.id
                        ? { ...req, amountRaised: req.amountRaised + amount }
                        : req
                )
            );

            // Update selected request
            setSelectedRequest(prev =>
                prev ? { ...prev, amountRaised: prev.amountRaised + amount } : null
            );

            // Show success message
            toast({
                title: "Donation Successful!",
                description: `Thank you for donating $${amount.toLocaleString()} to ${selectedRequest.needyName}. Your generosity makes a difference!`,
            });

            // Reset form
            setDonationAmount('');

        } catch (err) {
            console.error('Error processing donation:', err);
            setError('Failed to process donation. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Donation Platform
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Help those in need by making a difference in their lives. Select a fund request below and contribute to their cause.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Fund Requests List */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                Fund Requests
                            </h2>

                            {isLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                                            <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                            <div className="h-3 bg-gray-200 rounded mb-2"></div>
                                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : fundRequests.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">No fund requests available at the moment.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {fundRequests.map((request) => (
                                        <DonationCard
                                            key={request.id}
                                            request={request}
                                            isSelected={selectedRequest?.id === request.id}
                                            onSelect={handleSelectRequest}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Donation Form */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                    Make a Donation
                                </h3>

                                {selectedRequest ? (
                                    <div className="space-y-6">
                                        <div className="bg-blue-50 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-900 mb-1">
                                                Selected: {selectedRequest.needyName}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Remaining needed: $
                                                {(selectedRequest.amountRequested - selectedRequest.amountRaised).toLocaleString()}
                                            </p>
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <Label htmlFor="donation-amount">Donation Amount ($)</Label>
                                            <Input
                                                id="donation-amount"
                                                type="number"
                                                placeholder="Enter amount"
                                                value={donationAmount}
                                                onChange={(e) => setDonationAmount(e.target.value)}
                                                min="1"
                                                max={selectedRequest.amountRequested - selectedRequest.amountRaised}
                                                className="text-lg"
                                            />
                                        </div>

                                        {error && (
                                            <Alert variant="destructive">
                                                <AlertDescription>{error}</AlertDescription>
                                            </Alert>
                                        )}

                                        <Button
                                            onClick={handleDonate}
                                            disabled={isProcessing || !donationAmount}
                                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 text-lg"
                                        >
                                            {isProcessing ? 'Processing...' : 'Donate Now'}
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-4">
                                            Please select a fund request to make a donation.
                                        </p>
                                        <div className="text-sm text-gray-400">
                                            Choose from the fund requests on the left to get started.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
