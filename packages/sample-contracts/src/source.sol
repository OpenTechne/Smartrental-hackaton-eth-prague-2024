// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract ResidentialLeaseAgreement {
    enum Status {
        Uninitialized,
        PendingTenantApproval,
        Active,
        Terminated
    }

    address public immutable landlord;
    address public immutable tenant;
    uint256 public immutable securityDeposit;
    uint256 public immutable monthlyRent;
    uint256 public immutable leaseTerm;
    uint256 public immutable lateFeePerDay;
    uint256 public immutable earlyTerminationFee;
    uint256 public leaseStartDate;
    uint256 public totalRentPaid;
    Status public status;

    constructor(
        address _landlord,
        address _tenant,
        uint256 _securityDeposit,
        uint256 _monthlyRent,
        uint256 _leaseTerm,
        uint256 _lateFeePerDay,
        uint256 _earlyTerminationFee
    ) {
        landlord = _landlord;
        tenant = _tenant;
        securityDeposit = _securityDeposit;
        monthlyRent = _monthlyRent;
        leaseTerm = _leaseTerm;
        lateFeePerDay = _lateFeePerDay;
        earlyTerminationFee = _earlyTerminationFee;
        status = Status.Uninitialized;
    }

    function landlordApproveLease() external {
        require(msg.sender == landlord, "Only the landlord can approve the lease");
        require(status == Status.Uninitialized, "Lease is not in the correct state for landlord approval");
        status = Status.PendingTenantApproval;
    }

    function tenantApproveLease() external payable {
        require(msg.sender == tenant, "Only the tenant can approve the lease");
        require(status == Status.PendingTenantApproval, "Lease is not pending tenant approval");
        require(msg.value == securityDeposit + monthlyRent, "Tenant must pay the security deposit and first month's rent");
        leaseStartDate = block.timestamp;
        totalRentPaid = monthlyRent;
        status = Status.Active;
    }

    function payRent() external payable {
        require(msg.sender == tenant, "Only the tenant can pay rent");
        require(status == Status.Active, "Lease is not active");
        require(msg.value == monthlyRent, "Incorrect rent payment amount");
        totalRentPaid += msg.value;
        payable(landlord).transfer(msg.value);
    }

    function applyLateFee() external {
        require(status == Status.Active, "Lease is not active");
        uint256 lateRentDays = (block.timestamp - leaseStartDate) / 1 days - (totalRentPaid / monthlyRent) * 30;
        require(lateRentDays > 3, "Grace period of 3 days for late rent");
        uint256 lateFeeAmount = (lateRentDays - 3) * lateFeePerDay;
        require(address(this).balance >= lateFeeAmount, "Insufficient funds for late fee");
        payable(landlord).transfer(lateFeeAmount);
    }

    function terminateLease() external payable {
        require(status == Status.Active, "Lease is not active");
        require(msg.sender == landlord || msg.sender == tenant, "Only landlord or tenant can terminate the lease");
        
        if(block.timestamp >= leaseStartDate + leaseTerm) {
            payable(tenant).transfer(address(this).balance);
        } else if(msg.sender == tenant) {
            require(msg.value == earlyTerminationFee, "Tenant must pay early termination fee");
            payable(landlord).transfer(address(this).balance);
        } else {
            payable(tenant).transfer(address(this).balance);
        }
        
        status = Status.Terminated;
    }
}