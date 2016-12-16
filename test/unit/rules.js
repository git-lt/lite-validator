describe('Rules', function(){
    var $form = document.getElementById('form'),
        elems = $form.elements,
        me = window.liteValidator;
    function test(input, val, rules) {
        var result;
        if (val === undefined) input.value = val;
        return me.validField($form, input, rules) === true;
    }

    beforeEach(function(){
      // me = window.liteValidator;
    });

    afterEach(function(){
        // $form.data('validator').destroy();
        // $form.find('input').off().removeData();
    });

    describe('required', function(){
      it('required', function(){
        var input;
        input = elems['field1'];
        assert.ok( !test(input, '', [['required']]) && test(input, 'test',[['required']]), 'field1' );

        input = elems['field_novalidate'];
        assert.ok( test(input, '', [['required']]), 'field_novalidate' );

        input = elems['field_hidden'];
        assert.ok( !test(input, '', [['required']]) && test(input, 'test', [['required']]), 'field_hidden' );

        input = elems['field_display_none'];
        assert.ok( !test(input, '', [['required']]) && test(input, 'test', [['required']]), 'field_display_none' );

        input = elems['field_readonly'];
        assert.ok( !test(input, '', [['required']]) && test(input, 'test', [['required']]), 'field_readonly' );

        input = elems['field_textarea'];
        assert.ok( !test(input, '', [['required']]) && test(input, 'test', [['required']]), 'field_textarea' );

        input = elems['field_select'];
        assert.ok( !test(input, '', [['required']]) && test(input, '0', [['required']]), 'field_select' );
      });
    });
/*
    describe('integer', function(){
        it('integer', function(){
            var input;

            input = elems['field1'];
            assert.ok( !test(input, 'abc', [['integer']]) && !test(input, '3.14', [['integer']]) && test(input, '123', [['integer']]), 'field1' );
        });

        it('integer[+]', function(){
            var input;
            input = elems['field1'];
            assert.ok( !test(input, 'abc', [['integer:+']]) && !test(input, '-1', [['integer:+']]) && !test(input, '0', [['integer:+']]) && test(input, '1', [['integer:+']]), 'field1' );
        });

        it('integer[+0]', function(){
            var input;
            input = elems['field1'];
            assert.ok( !test(input, 'abc', [['integer:+0']]) && !test(input, '-1', [['integer:+0']]) && test(input, '0') && test(input, '1', [['integer:+0']]), 'field1' );
        });

        it('integer[-]', function(){
            var input;
            input = elems['field1'];
            assert.ok( !test(input, 'abc', [['integer:+0']]) && test(input, '-1', [['integer:+0']]) && !test(input, '0', [['integer:+0']]) && !test(input, '1', [['integer:+0']]), 'field1' );
        });

        it('integer[-0]', function(){
            var input;
            input = elems['field1'];
            assert.ok( !test(input, 'abc', [['integer:-0']]) && test(input, '-1', [['integer:-0']]) && test(input, '0', [['integer:-0']]) && !test(input, '1', [['integer:-0']]), 'field1' );
        });
    });


    describe('match', function(){
        it('match(field1)', function(){
            var input1, input2;

            me.setField({
                field1: 'required',
                field2: 'match(field1)'
            });

            input1 = elems['field1'];
            input2 = elems['field2'];
            input1.value = 'abc';
            assert.ok( test(input1) && !test(input2, '123') && test(input2, 'abc'), 'field1' );
        });

        it('match(eq, field1)', function(){
            var input1, input2;

            me.setField({
                field1: 'required',
                field2: 'match(eq, field1)'
            });

            input1 = elems['field1'];
            input2 = elems['field2'];
            input1.value = 'abc';
            assert.ok( test(input1) && !test(input2, '123') && test(input2, 'abc'), 'field1' );
        });

        it('match(neq, field1)', function(){
            var input1, input2;

            me.setField({
                field1: 'required',
                field2: 'match(neq, field1)'
            });

            input1 = elems['field1'];
            input2 = elems['field2'];
            input1.value = 'abc';
            assert.ok( test(input1) && test(input2, '123') && !test(input2, 'abc'), 'field1' );
        });

        it('match(lt, field1)', function(){
            var input1, input2;

            me.setField({
                field1: 'required',
                field2: 'match(lt, field1)'
            });

            input1 = elems['field1'];
            input2 = elems['field2'];
            input1.value = '5';
            assert.ok( test(input1) && test(input2, '4') && !test(input2, '5') && !test(input2, '6'), 'field1' );
        });

        it('match(lte, field1)', function(){
            var input1, input2;

            me.setField({
                field1: 'required',
                field2: 'match(lte, field1)'
            });

            input1 = elems['field1'];
            input2 = elems['field2'];
            input1.value = '5';
            assert.ok( test(input1) && test(input2, '4') && test(input2, '5') && !test(input2, '6'), 'field1' );
        });

        it('match(gt, field1)', function(){
            var input1, input2;

            me.setField({
                field1: 'required',
                field2: 'match(gt, field1)'
            });

            input1 = elems['field1'];
            input2 = elems['field2'];
            input1.value = '5';
            assert.ok( test(input1) && !test(input2, '4') && !test(input2, '5') && test(input2, '6'), 'field1' );
        });

        it('match(gte, field1)', function(){
            var input1, input2;

            me.setField({
                field1: 'required',
                field2: 'match(gte, field1)'
            });

            input1 = elems['field1'];
            input2 = elems['field2'];
            input1.value = '5';
            assert.ok( test(input1) && !test(input2, '4') && test(input2, '5') && test(input2, '6'), 'field1' );
        });
    });

    describe('range', function(){
        it('range[1~99]', function(){
            var input;

            me.setField({
                field1: 'range[1~99]'
            });

            input = elems['field1'];
            assert.ok(
                !test(input, 'abc') && !test(input, '0') && !test(input, '100') &&
                 test(input, '1') && test(input, '99'),
                'field1'
            );
        });

        it('range[1~]', function(){
            var input;

            me.setField({
                field1: 'range[1~]'
            });

            input = elems['field1'];
            assert.ok(
                !test(input, '-1') && !test(input, '0') &&
                 test(input, '1') && test(input, '100'),
                'field1'
            );
        });

        it('range[~99]', function(){
            var input;

            me.setField({
                field1: 'range[~99]'
            });

            input = elems['field1'];
            assert.ok(
                !test(input, '100') &&
                 test(input, '-1') && test(input, '0') && test(input, '99'),
                'field1'
            );
        });
    });

    describe('checked', function(){
        it('checked', function(){
            var inputs = document.getElementsByName('category[]');

            me.setField({
                'category[]': 'checked'
            });

            assert.ok( !test(inputs[0]) && !test(inputs[1]) );
            inputs[0].checked = true;
            assert.ok( test(inputs[0]) && test(inputs[1]) );
        });

        it('checked[1~2]', function(){
            var inputs = document.getElementsByName('category[]');

            me.setField({
                'category[]': 'checked[1~2]'
            });

            $(inputs).prop('checked', false);

            inputs[0].checked = true;
            assert.ok( test(inputs[0]) && test(inputs[1]) && test(inputs[2]) );
            inputs[1].checked = true;
            assert.ok( test(inputs[0]) && test(inputs[1]) && test(inputs[2]) );
            inputs[2].checked = true;
            assert.ok( !test(inputs[0]) && !test(inputs[1]) && !test(inputs[2]) );
        });

        it('checked[2]', function(){
            var inputs = document.getElementsByName('category[]');

            me.setField({
                'category[]': 'checked[2]'
            });

            $(inputs).prop('checked', false);

            assert.ok( !test(inputs[0]) && !test(inputs[1]) && !test(inputs[2]) );
            inputs[0].checked = true;
            assert.ok( !test(inputs[0]) && !test(inputs[1]) && !test(inputs[2]) );
            inputs[1].checked = true;
            assert.ok( test(inputs[0]) && test(inputs[1]) && test(inputs[2]) );
            inputs[2].checked = true;
            assert.ok( !test(inputs[0]) && !test(inputs[1]) && !test(inputs[2]) );
        });

        it('checked[2~]', function(){
            var inputs = document.getElementsByName('category[]');

            me.setField({
                'category[]': 'checked[2~]'
            });

            $(inputs).prop('checked', false);

            inputs[0].checked = true;
            assert.ok( !test(inputs[0]) && !test(inputs[1]) && !test(inputs[2]) );
            inputs[1].checked = true;
            assert.ok( test(inputs[0]) && test(inputs[1]) && test(inputs[2]) );
            inputs[2].checked = true;
            assert.ok( test(inputs[0]) && test(inputs[1]) && test(inputs[2]) );
        });

        it('checked[~2]', function(){
            var inputs = document.getElementsByName('category[]');

            me.setField({
                'category[]': 'checked[~2]'
            });

            $(inputs).prop('checked', false);

            assert.ok( test(inputs[0]) && test(inputs[1]) && test(inputs[2]) );
            inputs[0].checked = true;
            assert.ok( test(inputs[0]) && test(inputs[1]) && test(inputs[2]) );
            inputs[1].checked = true;
            assert.ok( test(inputs[0]) && test(inputs[1]) && test(inputs[2]) );
            inputs[2].checked = true;
            assert.ok( !test(inputs[0]) && !test(inputs[1]) && !test(inputs[2]) );

            $(inputs).prop('checked', false);
        });
    });

    describe('length', function(){
        it('length[~5]', function(){
            var input;

            me.setField({
                field1: 'length[~5]'
            });

            input = elems['field1'];
            assert.ok( test(input, '1234') && test(input, '12345') && !test(input, '123456'), 'field1' );
        });

        it('length[5]', function(){
            var input;

            me.setField({
                field1: 'length[5]'
            });

            input = elems['field1'];
            assert.ok( !test(input, '1234') && test(input, '12345') && !test(input, '123456'), 'field1' );
        });

        it('length[5~8]', function(){
            var input;

            me.setField({
                field1: 'length[5~8]'
            });

            input = elems['field1'];
            assert.ok( !test(input, '1234') && test(input, '12345') && test(input, '12345678') && !test(input, '123456789'), 'field1' );
        });

        it('length[5~]', function(){
            var input;

            me.setField({
                field1: 'length[5~]'
            });

            input = elems['field1'];
            assert.ok( !test(input, '1234') && test(input, '12345') && test(input, '123456789'), 'field1' );
        });

        it('length[~4, true]', function(){
            var input;

            me.setField({
                field1: 'length[~4, true]'
            });

            input = elems['field1'];
            assert.ok( test(input, '1234') && test(input, '测试') && test(input, '测1') && !test(input, '测试1'), 'field1' );
        });
    });

    describe('filter', function(){
        it('filter', function(){
            var input = elems['field1'];

            me.setField({
                field1: 'filter;required'
            });

            assert.ok( test(input, '1234') && test(input, '!@#$%^&*()'), 'test normal' );
            assert.ok( !test(input, '<>"`') && !test(input, '&#20;%3F'), 'test special' );
        });

        it('filter(<>)', function(){
            var input = elems['field1'];

            me.setField({
                field1: 'filter(<>);required'
            });

            assert.ok( test(input, '1234') && !test(input, '<>'), 'filter(<>)' );
        });
    });
*/
});
