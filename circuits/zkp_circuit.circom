pragma circom 2.0.0;

include "circomlib/circuits/sha256/sha256.circom";

template TicketEligibility() {
    signal input ticketId;
    signal input senderHash;
    signal input recipientHash;
    signal input captchaHash;
    signal input ticketCount; // number of tickets sender owns

    // Ensure captcha is solved (dummy check for equality to 1)
    signal input captchaSolved; // 1 if solved
    captchaSolved === 1;

    // Check ticketCount < 2
    component isLessThan = LessThan(32);
    isLessThan.in[0] <== ticketCount;
    isLessThan.in[1] <== 2;
    isLessThan.out === 1;

    // Nothing else enforced in this simplified circuit
}

component main = TicketEligibility();
